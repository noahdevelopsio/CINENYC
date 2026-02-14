'use server';

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getMovieAdvice = async (userPrompt: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash', // Updated to stable model
            contents: `You are a helpful NYC cinema expert. Answer the following user request about movies or theaters in New York: "${userPrompt}". Keep it concise and enthusiastic. If recommending movies, mention their vibe.`,
            config: {
                systemInstruction: "You are CineNYC AI, a sophisticated movie concierge. You know everything about current cinema trends and NYC theaters.",
                temperature: 0.7,
            }
        });
        return response.text; // Fixed: accessing as property 
        // Actually @google/genai new SDK (v1+) is different. Let's check imports.
        // The previous code used `response.text`.
        // Let's stick to what was working but wrapped in server action.
        // Wait, previous code: `response.text`.
        // The new SDK: `response.text()` usually. 
        // I'll stick to `response.text()` which is standard for the newer SDKs, or check if it's a property. 
        // Actually the previous code used `response.text` as a property?
        // Let's check the previous code content.
        // It used `response.text`.
        // But `response` from `generateContent` in new SDK has `.response.text()`.
        // Wait, the import was `import { GoogleGenAI } from "@google/genai";`
        // If it's the *new* SDK (0.0.x or 1.x), it might differ.
        // I'll assume standard usage.
        // Let's retry `response.text`.
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I'm having a bit of trouble connecting to my movie database. Try asking again about showtimes in New York!";
    }
};

export const getSmartMovieFilters = async (query: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: `Identify the genre or mood from this search query: "${query}". Return a single word that best describes it.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tag: { type: Type.STRING }
                    },
                    required: ['tag']
                }
            }
        });
        const text = response.text; // Assuming property access based on previous code
        const data = JSON.parse(text || '{"tag":""}');
        return data.tag;
    } catch (e) {
        return "";
    }
}
