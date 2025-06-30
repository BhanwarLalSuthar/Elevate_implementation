import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getSummary(text) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Summarize the following text into 3-5 concise bullet points.
    Return the summary as a JSON array of strings.
    Each string in the array should be a bullet point.
    Do NOT include any additional text or formatting outside the JSON array.
    Example output:
    [
      "This is the first bullet point.",
      "This is the second bullet point.",
      "This is the third bullet point."
    ]
    TEXT: ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const output = response.text();
  // The model sometimes returns the JSON wrapped in a markdown code block.
  // This removes the markdown fences if they exist.
  const cleanedOutput = output.replace(/^```(json)?\s*|```\s*$/g, '').trim();

  try {
    return JSON.parse(cleanedOutput);
  } catch {
    return ["Could not parse AI response", output];
  }
}

export default async function generatePost(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
