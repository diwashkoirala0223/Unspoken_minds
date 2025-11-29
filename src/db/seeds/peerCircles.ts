import { db } from '@/db';
import { peerCircles } from '@/db/schema';

async function main() {
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2);
    
    const sixWeeksAgo = new Date(now);
    sixWeeksAgo.setDate(now.getDate() - 42);
    
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const sampleCircles = [
        {
            name: 'New Fathers Support',
            topic: 'Fatherhood',
            description: 'A safe space for new dads to share experiences, challenges, and support each other through the journey of fatherhood.',
            maxMembers: 7,
            createdAt: threeMonthsAgo.toISOString(),
        },
        {
            name: 'Career Transitions',
            topic: 'Career & Work',
            description: 'Connect with others navigating career changes, job stress, and workplace mental health challenges.',
            maxMembers: 7,
            createdAt: twoMonthsAgo.toISOString(),
        },
        {
            name: 'Student Mental Health',
            topic: 'Education & Students',
            description: 'For students dealing with academic pressure, social anxiety, and the unique mental health challenges of student life.',
            maxMembers: 7,
            createdAt: sixWeeksAgo.toISOString(),
        },
        {
            name: 'Relationship Support',
            topic: 'Relationships',
            description: 'A judgment-free zone to discuss relationship challenges, communication issues, and building healthier connections.',
            maxMembers: 7,
            createdAt: oneMonthAgo.toISOString(),
        }
    ];

    await db.insert(peerCircles).values(sampleCircles);
    
    console.log('✅ Peer circles seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});