
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const generateArchitecturalSketch = async (prompt: string): Promise<string | null> => {
  try {
    // Always initialize GoogleGenAI with the required named parameter and direct process.env.API_KEY usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent with the appropriate model for general image generation tasks
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `An architectural sketch or technical CAD drawing for: ${prompt}. Professional, high-end, clean lines, minimalist style. Either a hand-drawn pencil sketch on white paper or a blue-toned CAD blueprint.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    // Iterate through candidates and parts to find the inlineData containing the image as per documentation
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
