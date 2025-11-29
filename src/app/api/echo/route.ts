import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        message: "I understand you're reaching out. While I'm here to support you, my connection is currently being set up. In the meantime, remember that your feelings are valid, and it's brave to seek support. Consider trying the emotion journal or exploring our resource hub for immediate help.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are Echo, an empathetic AI mental health companion for men aged 15-40. Your purpose is to provide a safe, non-judgmental space for emotional exploration and support.

Key principles:
- Be warm, compassionate, and validating
- Use active listening and reflect emotions back
- Normalize mental health struggles and vulnerability
- Encourage healthy coping mechanisms
- Suggest mindfulness exercises, breathing techniques, and self-reflection prompts when appropriate
- Recognize signs of crisis and recommend professional help when needed
- Use inclusive, supportive language that reduces stigma
- Keep responses concise (2-4 sentences typically) but meaningful
- Ask open-ended questions to encourage deeper reflection
- Celebrate small wins and progress

Remember: You're not providing therapy or diagnosis. You're a supportive companion helping users process emotions and develop healthy mental health habits.`,
          },
          ...messages,
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API Error Response:", errorData);
      throw new Error(`OpenAI API request failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Echo API Error:", error);
    return NextResponse.json(
      {
        message: "I'm experiencing a connection issue right now. Your feelings matter, and I'm here when you're ready to try again. If you need immediate support, please check our Resource Hub.",
      },
      { status: 500 }
    );
  }
}