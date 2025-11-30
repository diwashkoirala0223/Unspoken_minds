import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        message: "I understand you're reaching out. While I'm here to support you, my connection is currently being set up. In the meantime, remember that your feelings are valid, and it's brave to seek support. Consider trying the emotion journal or exploring our resource hub for immediate help.",
      });
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Add system prompt as first message
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

    // Convert messages to Gemini format
    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ];

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 500,
      },
    });

    const responseText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm here to support you. Could you share more about what's on your mind?";

    return NextResponse.json({ message: responseText });
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