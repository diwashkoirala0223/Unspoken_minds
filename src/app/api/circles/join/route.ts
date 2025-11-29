import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { peerCircles, circleMemberships } from '@/db/schema';
import { eq, and, count } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { circle_id, user_id } = body;

    // Validate required fields
    if (!circle_id) {
      return NextResponse.json({ 
        error: "circle_id is required",
        code: "MISSING_CIRCLE_ID" 
      }, { status: 400 });
    }

    if (!user_id) {
      return NextResponse.json({ 
        error: "user_id is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    // Validate IDs are valid integers
    const circleId = parseInt(circle_id);
    const userId = parseInt(user_id);

    if (isNaN(circleId)) {
      return NextResponse.json({ 
        error: "circle_id must be a valid integer",
        code: "INVALID_CIRCLE_ID" 
      }, { status: 400 });
    }

    if (isNaN(userId)) {
      return NextResponse.json({ 
        error: "user_id must be a valid integer",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    // Check if circle exists
    const circle = await db.select()
      .from(peerCircles)
      .where(eq(peerCircles.id, circleId))
      .limit(1);

    if (circle.length === 0) {
      return NextResponse.json({ 
        error: "Circle not found",
        code: "CIRCLE_NOT_FOUND" 
      }, { status: 404 });
    }

    const circleData = circle[0];

    // Check if user is already a member
    const existingMembership = await db.select()
      .from(circleMemberships)
      .where(
        and(
          eq(circleMemberships.circleId, circleId),
          eq(circleMemberships.userId, userId)
        )
      )
      .limit(1);

    if (existingMembership.length > 0) {
      return NextResponse.json({ 
        error: "User is already a member of this circle",
        code: "ALREADY_MEMBER" 
      }, { status: 400 });
    }

    // Count current members
    const memberCountResult = await db.select({ count: count() })
      .from(circleMemberships)
      .where(eq(circleMemberships.circleId, circleId));

    const currentMembers = memberCountResult[0].count;

    // Check if circle is full
    if (currentMembers >= circleData.maxMembers) {
      return NextResponse.json({ 
        error: "Circle is full",
        code: "CIRCLE_FULL" 
      }, { status: 400 });
    }

    // Create membership
    const newMembership = await db.insert(circleMemberships)
      .values({
        circleId: circleId,
        userId: userId,
        joinedAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newMembership[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}