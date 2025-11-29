import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    // Validate username is not empty
    if (!username || typeof username !== 'string' || username.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Username is required and cannot be empty',
          code: 'MISSING_USERNAME' 
        },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim();

    // Check if username already exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.username, trimmedUsername))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { 
          error: 'Username already exists',
          code: 'DUPLICATE_USERNAME' 
        },
        { status: 400 }
      );
    }

    // Create new user with auto-generated timestamps
    const now = new Date().toISOString();
    const newUser = await db.insert(users)
      .values({
        username: trimmedUsername,
        createdAt: now,
        lastActive: now,
      })
      .returning();

    return NextResponse.json(newUser[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID is present and valid
    if (!id) {
      return NextResponse.json(
        { 
          error: 'ID parameter is required',
          code: 'MISSING_ID' 
        },
        { status: 400 }
      );
    }

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Fetch user by ID
    const user = await db.select()
      .from(users)
      .where(eq(users.id, parsedId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}