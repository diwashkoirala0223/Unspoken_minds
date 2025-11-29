import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { echoConversations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('user_id');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 50);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate user_id parameter
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'user_id parameter is required',
          code: 'MISSING_USER_ID' 
        },
        { status: 400 }
      );
    }

    const userIdInt = parseInt(userId);
    if (isNaN(userIdInt)) {
      return NextResponse.json(
        { 
          error: 'user_id must be a valid integer',
          code: 'INVALID_USER_ID' 
        },
        { status: 400 }
      );
    }

    // Query conversations for the user
    const conversations = await db
      .select()
      .from(echoConversations)
      .where(eq(echoConversations.userId, userIdInt))
      .orderBy(desc(echoConversations.updatedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}