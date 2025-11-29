import { db } from '@/db';
import { journalEntries } from '@/db/schema';

async function main() {
    const sampleEntries = [
        {
            userId: 2,
            mood: 'stressed',
            content: 'Another late night at the office trying to meet this deadline. Feel like I'm constantly behind and can\'t catch a break. Need to find better ways to manage this pressure.',
            tags: JSON.stringify(['work', 'challenging']),
            createdAt: new Date('2024-12-29T22:30:00Z').toISOString(),
        },
        {
            userId: 1,
            mood: 'good',
            content: 'Had a real conversation with my partner today about how I\'ve been feeling. Felt scary to open up but she really listened. Small step but feels important.',
            tags: JSON.stringify(['relationships', 'growth', 'positive']),
            createdAt: new Date('2024-12-28T19:15:00Z').toISOString(),
        },
        {
            userId: 4,
            mood: 'anxious',
            content: 'Everyone expects me to have it all together - work, family, being the strong one. Sometimes I just want to admit I\'m struggling but don\'t know how.',
            tags: JSON.stringify(['challenging', 'family', 'work']),
            createdAt: new Date('2024-12-27T14:20:00Z').toISOString(),
        },
        {
            userId: 3,
            mood: 'calm',
            content: 'Went for a run this morning. Cleared my head in ways nothing else does. Why do I always forget how much this helps?',
            tags: JSON.stringify(['health', 'positive', 'gratitude']),
            createdAt: new Date('2024-12-26T07:45:00Z').toISOString(),
        },
        {
            userId: 5,
            mood: 'sad',
            content: 'Feeling isolated lately. Hard to connect with friends when everyone\'s busy. Miss having someone to just talk to without explaining everything.',
            tags: JSON.stringify(['relationships', 'challenging']),
            createdAt: new Date('2024-12-25T21:00:00Z').toISOString(),
        },
        {
            userId: 2,
            mood: 'okay',
            content: 'Dad duties are no joke. Love my kids but juggling their needs with work and everything else is exhausting. Need to cut myself some slack.',
            tags: JSON.stringify(['family', 'work', 'challenging']),
            createdAt: new Date('2024-12-24T16:30:00Z').toISOString(),
        },
        {
            userId: 1,
            mood: 'great',
            content: 'Finally finished that project I\'ve been stressing about. Taking time to appreciate the win instead of jumping to the next thing. Progress.',
            tags: JSON.stringify(['work', 'positive', 'gratitude']),
            createdAt: new Date('2024-12-23T18:00:00Z').toISOString(),
        },
        {
            userId: 4,
            mood: 'anxious',
            content: 'Keep thinking I should be further along in life. Comparing myself to others on social media isn\'t helping. Need to focus on my own path.',
            tags: JSON.stringify(['challenging', 'growth']),
            createdAt: new Date('2024-12-22T23:15:00Z').toISOString(),
        },
        {
            userId: 3,
            mood: 'good',
            content: 'Had a breakthrough moment in therapy today. Realized I don\'t have to carry everything alone. Actually felt emotional saying it out loud but in a good way.',
            tags: JSON.stringify(['growth', 'positive', 'health']),
            createdAt: new Date('2024-12-21T15:45:00Z').toISOString(),
        },
        {
            userId: 5,
            mood: 'stressed',
            content: 'Arguments with my partner are getting harder. Feel like I can\'t say the right thing. Maybe we need help figuring this out together.',
            tags: JSON.stringify(['relationships', 'challenging']),
            createdAt: new Date('2024-12-20T20:30:00Z').toISOString(),
        },
    ];

    await db.insert(journalEntries).values(sampleEntries);
    
    console.log('✅ Journal entries seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});