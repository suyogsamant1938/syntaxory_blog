import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate tech blog content
export const generateBlogContent = async (topic, style = "technical") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Write a ${style} blog post about "${topic}". 
    The blog should be engaging, informative, and well-structured with:
    - An engaging title
    - An introduction
    - Main content sections with headers
    - Conclusion
    - Key takeaways
    
    Format the response as valid markdown.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw error;
  }
};