import { NextRequest, NextResponse } from 'next/server';
import { generateStoryScene, StoryRequest } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body: StoryRequest = await request.json();

    if (!body.name || !body.ageGroup) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const story = await generateStoryScene(body);

    return NextResponse.json({
      success: true,
      story,
      metadata: {
        name: body.name,
        ageGroup: body.ageGroup,
        world: body.world,
        quest: body.quest,
        sceneNumber: body.sceneNumber || 1,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Story generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate story', fallback: true },
      { status: 500 }
    );
  }
}
