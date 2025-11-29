import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { journalEntries, users } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

const VALID_MOODS = ['great', 'good', 'calm', 'okay', 'stressed', 'anxious', 'sad'] as const;
type ValidMood = typeof VALID_MOODS[number];

function isValidMood(mood: string): mood is ValidMood {
  return VALID_MOODS.includes(mood as ValidMood);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, mood, content, tags } = body;

    // Validate required fields
    if (!user_id) {
      return NextResponse.json(
        { error: 'user_id is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    if (!mood) {
      return NextResponse.json(
        { error: 'mood is required', code: 'MISSING_MOOD' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'content is required', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    // Validate user_id is valid integer
    const userId = parseInt(user_id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'user_id must be a valid integer', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Validate mood is one of the allowed values
    if (!isValidMood(mood)) {
      return NextResponse.json(
        {
          error: `mood must be one of: ${VALID_MOODS.join(', ')}`,
          code: 'INVALID_MOOD'
        },
        { status: 400 }
      );
    }

    // Validate user exists
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 400 }
      );
    }

    // Validate tags if provided
    let processedTags = null;
    if (tags !== undefined && tags !== null) {
      if (!Array.isArray(tags)) {
        return NextResponse.json(
          { error: 'tags must be an array of strings', code: 'INVALID_TAGS' },
          { status: 400 }
        );
      }
      if (tags.some(tag => typeof tag !== 'string')) {
        return NextResponse.json(
          { error: 'all tags must be strings', code: 'INVALID_TAG_TYPE' },
          { status: 400 }
        );
      }
      processedTags = tags;
    }

    // Create journal entry
    const newEntry = await db.insert(journalEntries)
      .values({
        userId: userId,
        mood: mood,
        content: content.trim(),
        tags: processedTags,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newEntry[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const mood = searchParams.get('mood');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate user_id is provided
    if (!user_id) {
      return NextResponse.json(
        { error: 'user_id query parameter is required', code: 'MISSING_USER_ID' },
        { status: 400 }
      );
    }

    // Validate user_id is valid integer
    const userId = parseInt(user_id);
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: 'user_id must be a valid integer', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    // Validate mood if provided
    if (mood && !isValidMood(mood)) {
      return NextResponse.json(
        {
          error: `mood must be one of: ${VALID_MOODS.join(', ')}`,
          code: 'INVALID_MOOD'
        },
        { status: 400 }
      );
    }

    // Build query
    let query = db.select()
      .from(journalEntries)
      .where(eq(journalEntries.userId, userId));

    // Add mood filter if provided
    if (mood) {
      query = db.select()
        .from(journalEntries)
        .where(
          and(
            eq(journalEntries.userId, userId),
            eq(journalEntries.mood, mood)
          )
        );
    }

    // Execute query with sorting, limit and offset
    const entries = await query
      .orderBy(desc(journalEntries.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(entries, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate id is provided
    if (!id) {
      return NextResponse.json(
        { error: 'id query parameter is required', code: 'MISSING_ID' },
        { status: 400 }
      );
    }

    // Validate id is valid integer
    const entryId = parseInt(id);
    if (isNaN(entryId)) {
      return NextResponse.json(
        { error: 'id must be a valid integer', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if entry exists
    const existingEntry = await db.select()
      .from(journalEntries)
      .where(eq(journalEntries.id, entryId))
      .limit(1);

    if (existingEntry.length === 0) {
      return NextResponse.json(
        { error: 'Journal entry not found', code: 'ENTRY_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete entry
    const deleted = await db.delete(journalEntries)
      .where(eq(journalEntries.id, entryId))
      .returning();

    return NextResponse.json(
      {
        message: 'Journal entry deleted successfully',
        deletedEntry: deleted[0]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}