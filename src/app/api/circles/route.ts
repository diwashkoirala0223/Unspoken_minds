import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { peerCircles, circleMemberships } from '@/db/schema';
import { eq, like, desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const topic = searchParams.get('topic');

    // Build base query with member count subquery
    const memberCountSubquery = db
      .select({
        circleId: circleMemberships.circleId,
        count: sql<number>`count(*)`.as('count')
      })
      .from(circleMemberships)
      .groupBy(circleMemberships.circleId)
      .as('member_counts');

    let query = db
      .select({
        id: peerCircles.id,
        name: peerCircles.name,
        topic: peerCircles.topic,
        description: peerCircles.description,
        max_members: peerCircles.maxMembers,
        created_at: peerCircles.createdAt,
        current_members: sql<number>`COALESCE(${memberCountSubquery.count}, 0)`
      })
      .from(peerCircles)
      .leftJoin(
        memberCountSubquery,
        eq(peerCircles.id, memberCountSubquery.circleId)
      );

    // Apply topic filter if provided
    if (topic) {
      query = query.where(like(peerCircles.topic, `%${topic}%`));
    }

    // Apply sorting, pagination and execute query
    const results = await query
      .orderBy(desc(peerCircles.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
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