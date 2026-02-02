import { NextRequest, NextResponse } from 'next/server';
import { generateImage, generateArabicStoryImage } from '@/lib/gemini-image';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, type, heroName, setting, mood, style } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'story') {
      // Use Arabic story-optimized generation
      result = await generateArabicStoryImage(prompt, {
        heroName,
        setting,
        mood,
      });
    } else {
      // Use general image generation
      result = await generateImage(prompt, style);
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // Return as data URL for easy use in img tags
    const dataUrl = `data:${result.image?.mimeType};base64,${result.image?.base64}`;

    return NextResponse.json({
      success: true,
      imageUrl: dataUrl,
      text: result.text,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
