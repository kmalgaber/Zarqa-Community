
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client with the required named parameter and environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeText = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `قم بتلخيص النص التالي بأسلوب أكاديمي سهل ومنظم، واستخرج أهم 5 نقاط رئيسية:\n\n${text}`,
    config: {
      systemInstruction: "أنت مساعد دراسي خبير تساعد الطلاب في تلخيص المحاضرات والمواد العلمية باللغة العربية.",
    }
  });
  // Use the .text property directly as per guidelines.
  return response.text;
};

export const generateFlashcards = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `حول النص التالي إلى مجموعة من بطاقات الاستذكار (سؤال وجواب) لتعزيز الحفظ:\n\n${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING },
          },
          required: ["question", "answer"],
        },
      },
    },
  });
  
  try {
    // Extracting text output from response.text getter.
    const jsonStr = response.text?.trim() || "[]";
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI response as JSON", e);
    return [];
  }
};
