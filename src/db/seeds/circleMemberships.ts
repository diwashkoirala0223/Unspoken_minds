import { db } from '@/db';
import { circleMemberships } from '@/db/schema';

async function main() {
    const sampleMemberships = [
        // Circle 1 (New Fathers): Users 1, 3, 5
        {
            circleId: 1,
            userId: 1,
            joinedAt: new Date('2024-01-16').toISOString(),
        },
        {
            circleId: 1,
            userId: 3,
            joinedAt: new Date('2024-01-18').toISOString(),
        },
        {
            circleId: 1,
            userId: 5,
            joinedAt: new Date('2024-01-22').toISOString(),
        },
        
        // Circle 2 (Career Transitions): Users 2, 4, 5
        {
            circleId: 2,
            userId: 2,
            joinedAt: new Date('2024-01-17').toISOString(),
        },
        {
            circleId: 2,
            userId: 4,
            joinedAt: new Date('2024-01-20').toISOString(),
        },
        {
            circleId: 2,
            userId: 5,
            joinedAt: new Date('2024-01-25').toISOString(),
        },
        
        // Circle 3 (Student Mental Health): Users 1, 2, 3, 4
        {
            circleId: 3,
            userId: 1,
            joinedAt: new Date('2024-01-19').toISOString(),
        },
        {
            circleId: 3,
            userId: 2,
            joinedAt: new Date('2024-01-21').toISOString(),
        },
        {
            circleId: 3,
            userId: 3,
            joinedAt: new Date('2024-01-23').toISOString(),
        },
        {
            circleId: 3,
            userId: 4,
            joinedAt: new Date('2024-01-26').toISOString(),
        },
        
        // Circle 4 (Relationship Support): Users 1, 2, 4, 5
        {
            circleId: 4,
            userId: 1,
            joinedAt: new Date('2024-01-18').toISOString(),
        },
        {
            circleId: 4,
            userId: 2,
            joinedAt: new Date('2024-01-24').toISOString(),
        },
        {
            circleId: 4,
            userId: 4,
            joinedAt: new Date('2024-01-27').toISOString(),
        },
        {
            circleId: 4,
            userId: 5,
            joinedAt: new Date('2024-01-29').toISOString(),
        },
    ];

    await db.insert(circleMemberships).values(sampleMemberships);
    
    console.log('✅ Circle memberships seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});