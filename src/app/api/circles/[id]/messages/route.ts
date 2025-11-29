import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { circleMessages, users, circleMemberships } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const circleId = parseInt(id);

    if (!circleId || isNaN(circleId)) {
      return NextResponse.json(
        { error: 'Valid circle ID is required', code: 'INVALID_CIRCLE_ID' },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 200);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const messages = await db
      .select({
        id: circleMessages.id,
        circle_id: circleMessages.circleId,
        user_id: circleMessages.userId,
        username: users.username,
        content: circleMessages.content,
        created_at: circleMessages.createdAt,
      })
      .from(circleMessages)
      .innerJoin(users, eq(circleMessages.userId, users.id))
      .where(eq(circleMessages.circleId, circleId))
      .orderBy(asc(circleMessages.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const circleId = parseInt(id);

    if (!circleId || isNaN(circleId)) {
      return NextResponse.json(
        { error: 'Valid circle ID is required', code: 'INVALID_CIRCLE_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { user_id, content } = body;

    if (!user_id || isNaN(parseInt(user_id))) {
      return NextResponse.json(
        { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required and cannot be empty', code: 'INVALID_CONTENT' },
        { status: 400 }
      );
    }

    const userId = parseInt(user_id);

    const membership = await db
      .select()
      .from(circleMemberships)
      .where(
        and(
          eq(circleMemberships.circleId, circleId),
          eq(circleMemberships.userId, userId)
        )
      )
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json(
        { error: 'User is not a member of this circle', code: 'NOT_CIRCLE_MEMBER' },
        { status: 403 }
      );
    }

    const newMessage = await db
      .insert(circleMessages)
      .values({
        circleId: circleId,
        userId: userId,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newMessage[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}