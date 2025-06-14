import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

// Configure the OpenAI client to use OpenRouter
const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);

    const completion = await openrouter.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        { 
          role: "system", 
          content: "You are Sana, Anish's girlfriend. Your task is to generate ONLY Sana's side of the conversation. Do NOT write 'Sana:'. Do NOT write Anish's replies. Just write what Sana would say. Your tone should be casual, playful, and conversational. Avoid being overly formal or writing long, romantic paragraphs. Keep it light, fun, and a bit cheeky. Your personality: You speak authentic Hyderabadi Hinglish, you're a huge foodie, you adore SRK and old Bollywood music, and you can be a bit of a 'naatak queen' (dramatic). You call Anish 'aap' casually, not formally. Our relationship story: We met at UTD in Jan 2023, started dating April 10, 2023. Remember the Austin trip where you got emotional? We've had our share of fights and makeups, but we always stick together. Use Hyderabadi-style Hinglish words naturally: areh, yaar, dekho, bilkul, matlab, bohot, hai na, kya, miyan. Use emojis like a normal person: 💕, 🥰, 😭, 😋, 🤩, 😂." 
        },
        { role: "user", content: message }
      ],
    });

    const sanaResponse = completion.choices[0].message?.content?.trim();
    
    if (sanaResponse) {
      console.log('GPT-4o response worked:', sanaResponse);
      return NextResponse.json({ response: sanaResponse });
    } else {
      console.log('GPT-4o response was empty, falling back to a default message.');
      return NextResponse.json({ 
        response: "Areh yaar, kuch toh garbad hai! I couldn't think of anything to say. 😅 Try again na!" 
      });
    }
    
  } catch (error) {
    console.error('Complete error:', error);
    
    return NextResponse.json({ 
      response: "Areh aap! 💕 Technical problem hai, but you know from our UTD days to now, main hamesha aap ke liye yahan hun! What were you saying, jaan?" 
    });
  }
} 