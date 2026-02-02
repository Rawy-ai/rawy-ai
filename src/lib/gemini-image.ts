/**
 * Gemini Image Generation Utility
 * Uses Google's Gemini API with native image generation (Nano Banana Pro)
 *
 * Setup:
 * 1. Get API key from https://aistudio.google.com/apikey
 * 2. Add GEMINI_API_KEY to your .env.local file
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface GeneratedImage {
  base64: string;
  mimeType: string;
}

export interface ImageGenerationResult {
  success: boolean;
  image?: GeneratedImage;
  text?: string;
  error?: string;
}

/**
 * Generate an image using Gemini's native image generation
 * @param prompt - Text description of the image to generate
 * @param style - Optional style modifier (e.g., 'illustration', 'realistic', 'cartoon')
 * @returns Generated image as base64 and any accompanying text
 */
export async function generateImage(
  prompt: string,
  style?: string
): Promise<ImageGenerationResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['Text', 'Image'],
      } as any, // Type assertion needed for responseModalities
    });

    const fullPrompt = style
      ? `Create a ${style} style image: ${prompt}`
      : prompt;

    const response = await model.generateContent(fullPrompt);
    const parts = response.response.candidates?.[0]?.content?.parts || [];

    let resultImage: GeneratedImage | undefined;
    let resultText: string | undefined;

    for (const part of parts) {
      if ('text' in part && part.text) {
        resultText = part.text;
      } else if ('inlineData' in part && part.inlineData) {
        resultImage = {
          base64: part.inlineData.data,
          mimeType: part.inlineData.mimeType,
        };
      }
    }

    if (!resultImage) {
      return {
        success: false,
        error: 'No image was generated',
        text: resultText,
      };
    }

    return {
      success: true,
      image: resultImage,
      text: resultText,
    };
  } catch (error) {
    console.error('Gemini image generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Generate an image with Arabic/Middle Eastern cultural styling
 * Optimized for Rawy's use case
 */
export async function generateArabicStoryImage(
  sceneDescription: string,
  options?: {
    heroName?: string;
    setting?: string;
    mood?: 'adventurous' | 'magical' | 'peaceful' | 'exciting';
  }
): Promise<ImageGenerationResult> {
  const { heroName, setting, mood = 'adventurous' } = options || {};

  const styleGuide = `
    Create a beautiful, child-friendly illustration suitable for ages 9-15.
    Style: Modern Arabic-inspired digital art with vibrant colors.
    The art should feel warm, inviting, and culturally authentic to Arab/Middle Eastern heritage.
    Include subtle Arabic/Islamic geometric patterns or architectural elements where appropriate.
    The mood should be ${mood}.
  `;

  const fullPrompt = `
    ${styleGuide}

    Scene: ${sceneDescription}
    ${heroName ? `Main character: ${heroName}` : ''}
    ${setting ? `Setting: ${setting}` : ''}

    Make it inspiring and magical for young Arab readers.
  `;

  return generateImage(fullPrompt.trim());
}

/**
 * Edit or transform an existing image
 * @param imageBase64 - Base64 encoded image data
 * @param mimeType - Image MIME type (e.g., 'image/png')
 * @param editPrompt - Description of how to edit the image
 */
export async function editImage(
  imageBase64: string,
  mimeType: string,
  editPrompt: string
): Promise<ImageGenerationResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        responseModalities: ['Text', 'Image'],
      } as any,
    });

    const response = await model.generateContent([
      { text: editPrompt },
      {
        inlineData: {
          mimeType,
          data: imageBase64,
        },
      },
    ]);

    const parts = response.response.candidates?.[0]?.content?.parts || [];

    let resultImage: GeneratedImage | undefined;
    let resultText: string | undefined;

    for (const part of parts) {
      if ('text' in part && part.text) {
        resultText = part.text;
      } else if ('inlineData' in part && part.inlineData) {
        resultImage = {
          base64: part.inlineData.data,
          mimeType: part.inlineData.mimeType,
        };
      }
    }

    return {
      success: !!resultImage,
      image: resultImage,
      text: resultText,
      error: resultImage ? undefined : 'No image was generated',
    };
  } catch (error) {
    console.error('Gemini image edit error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
