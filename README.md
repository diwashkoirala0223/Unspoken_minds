# Unspoken Minds

A safe, anonymous mental health platform designed for men aged 15–40 to explore and share emotions without stigma.

## 🌟 Overview

Unspoken Minds provides a comprehensive mental wellness ecosystem with:

- **Echo AI Coach** - Empathetic AI companion for emotional support and coping strategies
- **Emotion Journal** - Private, encrypted journaling with mood tracking and pattern analysis
- **Anonymous Peer Circles** - Small support groups (5-7 members) with AI moderation
- **Resource Hub** - Curated helplines, counseling services, motivational stories, and voice journaling

## ✨ Key Features

### 🤖 Echo AI Chat Coach
- Natural language conversations with GPT-4 powered AI
- Empathetic, non-judgmental support 24/7
- Personalized coping strategies and mindfulness exercises
- Conversation history saved securely to database

### 📔 Emotion Journal
- Log daily moods with 7 emotion states (great, good, calm, okay, stressed, anxious, sad)
- Track patterns with visual mood analytics
- Add tags for categorization (work, relationships, family, health, etc.)
- Encrypted storage with full data deletion control
- Real-time mood pattern visualization

### 👥 Anonymous Peer Circles
- Join topic-specific support groups (Fatherhood, Career, Students, Relationships)
- Pseudonymous usernames protect identity
- AI-monitored conversations ensure respectful environment
- Limited to 5-7 members for intimate discussions
- Real-time messaging with database persistence

### 💚 Resource Hub
- International mental health helplines and crisis support
- Online counseling platforms (BetterHelp, Talkspace, 7 Cups, etc.)
- Motivational recovery stories from real men
- Safe Voice Zone for audio journaling with emotion analytics (UI ready)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with calming mental health color palette
- **UI Components:** Shadcn/UI + Radix UI
- **Database:** Turso (LibSQL) with Drizzle ORM
- **AI:** OpenAI GPT-4o-mini API
- **Authentication:** Session-based with localStorage (pseudonymous)
- **Deployment Ready:** Optimized for Vercel

## 📊 Database Schema

### Tables
1. **users** - Pseudonymous user identities
2. **journal_entries** - Private mood logs with tags
3. **echo_conversations** - AI chat history
4. **peer_circles** - Support group definitions
5. **circle_memberships** - User-circle relationships
6. **circle_messages** - Group chat messages
7. **voice_recordings** - Audio journal metadata (future feature)

### Sample Data
The database is pre-seeded with:
- 5 sample users with realistic pseudonymous usernames
- 4 active peer circles across different topics
- 10 journal entries with authentic mental health content
- 20 supportive circle messages demonstrating healthy peer interactions

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ or Bun
- OpenAI API key (for Echo AI feature)

### Installation

1. **Clone and install dependencies:**
```bash
bun install
```

2. **Environment variables are already configured:**
   - Database (Turso) is set up and seeded
   - You only need to add your OpenAI API key

3. **Add OpenAI API Key:**
   - The app will work without it, but Echo AI will show a fallback message
   - To enable full Echo AI functionality, add to `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run development server:**
```bash
bun run dev
```

5. **Open your browser:**
```
http://localhost:3000
```

## 🎨 Design System

### Color Palette
The app uses a calming blue-green palette optimized for mental wellness:

**Light Mode:**
- Primary: Soothing teal (`oklch(0.55 0.12 200)`)
- Secondary: Soft sage (`oklch(0.92 0.025 160)`)
- Background: Gentle off-white (`oklch(0.98 0.005 220)`)

**Dark Mode:**
- Primary: Calming bright teal (`oklch(0.65 0.15 200)`)
- Background: Deep, calming blue-black (`oklch(0.15 0.02 240)`)

### Typography
- Sans: Geist Sans (modern, clean)
- Mono: Geist Mono (code/data display)

## 📱 User Flow

1. **First Visit:**
   - User sees homepage with mission statement and features
   - Can browse Resources without account

2. **Create Identity:**
   - Click any protected feature (Echo, Journal, Circles)
   - Generate or choose pseudonymous username
   - No email or personal info required
   - Instant account creation

3. **Use Features:**
   - **Echo AI:** Start conversations immediately
   - **Journal:** Log moods and view patterns
   - **Peer Circles:** Join groups and share experiences
   - **Resources:** Access helplines and stories anytime

4. **Privacy Control:**
   - Logout from dropdown menu
   - All data encrypted and stored securely
   - Delete entries individually
   - Complete account deletion available

## 🔒 Security & Privacy

- **Pseudonymous by design** - No real names or identifying information
- **End-to-end encryption ready** - Database stored securely on Turso
- **Local session management** - User data in localStorage (can be cleared)
- **No tracking** - Privacy-first approach
- **AI moderation** - Content monitoring in peer circles (framework ready)
- **Data ownership** - Users can delete all content at will

## 📊 API Endpoints

### Users
- `POST /api/users` - Create pseudonymous user
- `GET /api/users?id={id}` - Get user profile

### Journal
- `POST /api/journal/entries` - Create entry
- `GET /api/journal/entries?user_id={id}` - List entries
- `DELETE /api/journal/entries?id={id}` - Delete entry

### Echo AI
- `POST /api/echo` - Chat with AI
- `POST /api/echo/save` - Save conversation
- `GET /api/echo/history?user_id={id}` - Get history

### Peer Circles
- `GET /api/circles` - List circles with member counts
- `POST /api/circles/join` - Join circle
- `GET /api/circles/{id}/messages` - Get messages
- `POST /api/circles/{id}/messages` - Send message

## 🎯 Impact Goals

1. **Reduce stigma** around men's mental health
2. **Encourage vulnerability** as a strength
3. **Promote peer support** and community
4. **Enable early detection** of emotional distress
5. **Provide accessible resources** globally

## 🔮 Future Enhancements

- [ ] Smartwatch integration for real-time mood tracking
- [ ] Voice emotion analytics implementation
- [ ] Enhanced AI moderation in peer circles
- [ ] Partnership integrations with NGOs and universities
- [ ] "Unspoken Week" global campaigns
- [ ] Direct therapy/counselor booking
- [ ] Anonymous story submission system
- [ ] Multi-language support for global reach
- [ ] Mobile app (React Native)
- [ ] Push notifications for circle activity

## 🤝 Target Audience

- **Students (15-25)** - Academic pressure, social anxiety, identity exploration
- **Young Professionals (25-35)** - Career stress, work-life balance, relationships
- **Fathers (25-40)** - Parenting challenges, role transitions, family pressures
- **Regions with limited mental health access** - Stigmatized communities, underserved areas

## ⚠️ Important Disclaimers

**This app provides peer support and AI guidance, NOT professional therapy.**

- Echo AI is supportive but not a replacement for licensed mental health professionals
- In crisis situations, users are directed to emergency helplines
- All features include prominent crisis support information
- App complements, not replaces, professional mental health care

## 🚨 Crisis Resources

If you or someone you know is in crisis:

**US:** 988 (Suicide & Crisis Lifeline)  
**US Text:** Text HOME to 741741  
**UK:** 116 123 (Samaritans)  
**Australia:** 13 11 14 (Lifeline)

## 👨‍💻 Development

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build for production
bun run build

# Run production build
bun start
```

## 🌐 Deployment

Ready to deploy on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

Database is already configured and hosted on Turso.

---

**Remember: Vulnerability is strength. You're not alone. 💚**