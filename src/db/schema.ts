import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  createdAt: text('created_at').notNull(),
  lastActive: text('last_active').notNull(),
});

// Journal entries table
export const journalEntries = sqliteTable('journal_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  mood: text('mood').notNull(),
  content: text('content').notNull(),
  tags: text('tags', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});

// Echo conversations table
export const echoConversations = sqliteTable('echo_conversations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  messages: text('messages', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Peer circles table
export const peerCircles = sqliteTable('peer_circles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  topic: text('topic').notNull(),
  description: text('description').notNull(),
  maxMembers: integer('max_members').notNull().default(7),
  createdAt: text('created_at').notNull(),
});

// Circle memberships table
export const circleMemberships = sqliteTable('circle_memberships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  circleId: integer('circle_id').notNull().references(() => peerCircles.id),
  userId: integer('user_id').notNull().references(() => users.id),
  joinedAt: text('joined_at').notNull(),
});

// Circle messages table
export const circleMessages = sqliteTable('circle_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  circleId: integer('circle_id').notNull().references(() => peerCircles.id),
  userId: integer('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: text('created_at').notNull(),
});

// Voice recordings table
export const voiceRecordings = sqliteTable('voice_recordings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  duration: integer('duration').notNull(),
  emotionAnalysis: text('emotion_analysis', { mode: 'json' }),
  createdAt: text('created_at').notNull(),
});