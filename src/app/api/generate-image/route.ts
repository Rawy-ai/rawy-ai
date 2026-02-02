import { NextRequest, NextResponse } from 'next/server';
import { generateSceneImage, ImageRequest } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body: ImageRequest = await request.json();

    if (!body.heroName || !body.world || !body.sceneDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const imageUrl = await generateSceneImage(body);

    return NextResponse.json({
      success: true,
      imageUrl,
      metadata: {
        heroName: body.heroName,
        world: body.world,
        sceneNumber: body.sceneNumber,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image', fallback: true },
      { status: 500 }
    );
  }
}
