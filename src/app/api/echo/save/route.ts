import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { echoConversations, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, messages } = body;

    // Validate user_id
    if (!user_id || isNaN(parseInt(user_id))) {
      return NextResponse.json(
        { 
          error: 'Valid user_id is required',
          code: 'INVALID_USER_ID'
        },
        { status: 400 }
      );
    }

    // Validate messages field exists
    if (!messages) {
      return NextResponse.json(
        { 
          error: 'Messages field is required',
          code: 'MISSING_MESSAGES'
        },
        { status: 400 }
      );
    }

    // Validate messages is an array
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { 
          error: 'Messages must be an array',
          code: 'INVALID_MESSAGES_FORMAT'
        },
        { status: 400 }
      );
    }

    // Validate messages array is not empty
    if (messages.length === 0) {
      return NextResponse.json(
        { 
          error: 'Messages array cannot be empty',
          code: 'EMPTY_MESSAGES'
        },
        { status: 400 }
      );
    }

    // Validate each message has required fields
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i] as Message;
      
      if (!message.role || typeof message.role !== 'string') {
        return NextResponse.json(
          { 
            error: `Message at index ${i} is missing or has invalid 'role' field`,
            code: 'INVALID_MESSAGE_ROLE'
          },
          { status: 400 }
        );
      }

      if (!message.content || typeof message.content !== 'string') {
        return NextResponse.json(
          { 
            error: `Message at index ${i} is missing or has invalid 'content' field`,
            code: 'INVALID_MESSAGE_CONTENT'
          },
          { status: 400 }
        );
      }

      if (!message.timestamp || typeof message.timestamp !== 'string') {
        return NextResponse.json(
          { 
            error: `Message at index ${i} is missing or has invalid 'timestamp' field`,
            code: 'INVALID_MESSAGE_TIMESTAMP'
          },
          { status: 400 }
        );
      }
    }

    // Validate that user exists
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(user_id)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        },
        { status: 400 }
      );
    }

    // Create conversation with auto-generated timestamps
    const currentTimestamp = new Date().toISOString();
    
    const newConversation = await db.insert(echoConversations)
      .values({
        userId: parseInt(user_id),
        messages: messages,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
      .returning();

    return NextResponse.json(newConversation[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}