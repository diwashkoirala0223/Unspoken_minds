import { db } from '@/db';
import { users } from '@/db/schema';

async function main() {
    const sampleUsers = [
        {
            username: 'BraveWolf42',
            createdAt: new Date('2024-10-15T14:23:11.000Z').toISOString(),
            lastActive: new Date('2025-01-12T09:15:22.000Z').toISOString(),
        },
        {
            username: 'CalmMountain88',
            createdAt: new Date('2024-11-02T08:45:33.000Z').toISOString(),
            lastActive: new Date('2025-01-13T18:42:15.000Z').toISOString(),
        },
        {
            username: 'QuietOcean25',
            createdAt: new Date('2024-11-20T16:12:47.000Z').toISOString(),
            lastActive: new Date('2025-01-14T11:28:09.000Z').toISOString(),
        },
        {
            username: 'SilentForest17',
            createdAt: new Date('2024-12-05T19:34:28.000Z').toISOString(),
            lastActive: new Date('2025-01-13T22:51:44.000Z').toISOString(),
        },
        {
            username: 'StrongRiver33',
            createdAt: new Date('2024-12-18T10:07:55.000Z').toISOString(),
            lastActive: new Date('2025-01-14T07:33:18.000Z').toISOString(),
        }
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});