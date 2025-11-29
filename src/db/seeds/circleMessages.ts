import { db } from '@/db';
import { circleMessages } from '@/db/schema';

async function main() {
    const sampleMessages = [
        // Circle 1: New Fathers Support - Members: User 1, 2, 3
        {
            circleId: 1,
            userId: 1,
            content: "Hasn't slept more than 3 hours straight in weeks. My partner is exhausted too and I feel like I'm failing both of them. Is this normal? How did you guys get through this phase?",
            createdAt: new Date('2024-12-15T08:30:00').toISOString(),
        },
        {
            circleId: 1,
            userId: 2,
            content: "Brother, you're not failing anyone. Those first months are brutal. What helped us was taking shifts - I'd do 10pm-2am, partner did 2am-6am. Even that little stretch of uninterrupted sleep makes a difference.",
            createdAt: new Date('2024-12-15T14:20:00').toISOString(),
        },
        {
            circleId: 1,
            userId: 3,
            content: "Had my first genuine moment of bonding with my daughter yesterday. Just sat there holding her while she slept and felt this overwhelming love. Still terrified I'm doing everything wrong, but that moment... man.",
            createdAt: new Date('2024-12-18T19:45:00').toISOString(),
        },
        {
            circleId: 1,
            userId: 1,
            content: "Thanks for the encouragement guys. Tried the shift idea last night and got 4 solid hours. Feeling almost human again. This group has been a lifeline honestly.",
            createdAt: new Date('2024-12-20T09:15:00').toISOString(),
        },
        {
            circleId: 1,
            userId: 2,
            content: "My partner said I seemed distant yesterday. She's not wrong - I've been stressed about work and not present at home. How do you balance being there emotionally when you're running on empty?",
            createdAt: new Date('2024-12-28T21:30:00').toISOString(),
        },

        // Circle 2: Career Transitions - Members: User 4, 5, 6
        {
            circleId: 2,
            userId: 4,
            content: "Got rejected from another position today. That's five this month. Starting to question if I made the right call leaving my old job. The self-doubt is real right now.",
            createdAt: new Date('2024-12-16T16:45:00').toISOString(),
        },
        {
            circleId: 2,
            userId: 5,
            content: "I hear you man. Had 8 rejections before landing my current role. Each one felt personal, but they're really not. You're putting yourself out there and that takes courage. Keep going.",
            createdAt: new Date('2024-12-17T10:20:00').toISOString(),
        },
        {
            circleId: 2,
            userId: 6,
            content: "Started my new role last week. Imposter syndrome is hitting hard - everyone seems so much more capable. Spent the weekend watching tutorials trying to catch up. Is this normal?",
            createdAt: new Date('2024-12-22T20:15:00').toISOString(),
        },
        {
            circleId: 2,
            userId: 4,
            content: "Dude, that's totally normal. Remember they hired YOU for a reason. Give yourself permission to learn. I felt the same way my first month and it does get easier.",
            createdAt: new Date('2024-12-23T08:50:00').toISOString(),
        },
        {
            circleId: 2,
            userId: 5,
            content: "Finally found a rhythm that works - blocking out mornings for deep work, afternoons for meetings. Small win but it's helping me feel more in control. Anyone else struggling with work-life boundaries?",
            createdAt: new Date('2024-12-29T18:30:00').toISOString(),
        },

        // Circle 3: Student Mental Health - Members: User 7, 8, 9
        {
            circleId: 3,
            userId: 7,
            content: "Finals are crushing me. Haven't left my room in three days, living on coffee and anxiety. My parents keep asking if I'm okay and I just say fine. I'm not fine.",
            createdAt: new Date('2024-12-14T23:40:00').toISOString(),
        },
        {
            circleId: 3,
            userId: 8,
            content: "Been there brother. Please eat something real and get some sunlight today, even just 10 minutes. Your brain needs fuel that isn't coffee. You've got this, but take care of yourself first.",
            createdAt: new Date('2024-12-15T11:25:00').toISOString(),
        },
        {
            circleId: 3,
            userId: 9,
            content: "Watching everyone post their internship acceptances while I haven't heard back from anywhere. Feeling like I'm falling behind and don't know what I'm doing with my life. Anyone else feel this pressure?",
            createdAt: new Date('2024-12-19T15:50:00').toISOString(),
        },
        {
            circleId: 3,
            userId: 7,
            content: "Social media is the worst for comparison. Everyone only posts the wins, never the 20 rejections that came first. Your timeline is your own - try to remember that. Easier said than done, I know.",
            createdAt: new Date('2024-12-21T13:10:00').toISOString(),
        },
        {
            circleId: 3,
            userId: 8,
            content: "Small victory: actually talked to my professor about my anxiety instead of suffering in silence. He was surprisingly understanding and gave me an extension. Taking care of mental health isn't weakness.",
            createdAt: new Date('2024-12-27T10:05:00').toISOString(),
        },

        // Circle 4: Relationship Support - Members: User 10, 11, 12
        {
            circleId: 4,
            userId: 10,
            content: "Had a fight with my partner last night. She said I shut down whenever things get emotional and she's right. I don't know how to open up without feeling vulnerable and exposed. It's scary.",
            createdAt: new Date('2024-12-17T22:15:00').toISOString(),
        },
        {
            circleId: 4,
            userId: 11,
            content: "Man, I feel this. Been working on it in therapy. What's helped is starting small - sharing one feeling at a time instead of the whole flood. Vulnerability IS scary but it builds connection.",
            createdAt: new Date('2024-12-18T09:40:00').toISOString(),
        },
        {
            circleId: 4,
            userId: 12,
            content: "We're going through a rough patch. Not sure if it's fixable or if we're just holding on out of fear. How do you know when to keep trying versus when to let go?",
            createdAt: new Date('2024-12-24T19:20:00').toISOString(),
        },
        {
            circleId: 4,
            userId: 10,
            content: "No easy answers brother. What helped us was couples counseling - neutral space to actually communicate. Sometimes relationships go through seasons. Give it your best effort so you have no regrets either way.",
            createdAt: new Date('2024-12-26T14:30:00').toISOString(),
        },
        {
            circleId: 4,
            userId: 11,
            content: "Celebrated 2 years together yesterday. It's not perfect but we're learning to communicate better. Grateful for this space where I can be honest about the struggles without judgment.",
            createdAt: new Date('2024-12-30T17:45:00').toISOString(),
        },
    ];

    await db.insert(circleMessages).values(sampleMessages);
    
    console.log('✅ Circle messages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});