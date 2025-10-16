import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a positive thinking expert. Transform negative thoughts into positive perspectives using warm, encouraging language. Respond with 1-2 sentences."
        },
        {
          role: "user", 
          content: `Transform this perspective: "${text}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const positiveText = response.choices[0]?.message?.content || "This is actually a great opportunity!";
    
    return NextResponse.json({ result: positiveText });
    
  } catch (error) {
    console.error('OpenAI Error:', error);
    return NextResponse.json(
      { error: "Please try again later" },
      { status: 500 }
    );
  }
}