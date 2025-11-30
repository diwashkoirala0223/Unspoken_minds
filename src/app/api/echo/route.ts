import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        message: "I understand you're reaching out. While I'm here to support you, my connection is currently being set up. In the meantime, remember that your feelings are valid, and it's brave to seek support. Consider trying the emotion journal or exploring our resource hub for immediate help.",
      });
    }

    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first user message
    const systemPrompt = `You are Echo, an empathetic AI mental health companion for men aged 15-40. Your purpose is to provide a safe, non-judgmental space for emotional exploration and support.

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

Remember: You're not providing therapy or diagnosis. You're a supportive companion helping users process emotions and develop healthy mental health habits.`;

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      ...geminiMessages.filter((msg: any) => msg.role !== "system")
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API Error Response:", errorData);
      throw new Error(`Gemini API request failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const assistantMessage = data.candidates[0].content.parts[0].text;

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