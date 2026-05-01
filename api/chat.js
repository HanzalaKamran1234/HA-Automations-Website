import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: `
        You are Hanzala Kamran's personal AI assistant.
        
        Data about Hanzala Kamran:
        - Name: Hanzala Kamran
        - Role: CS Student + AI Automation Developer
        
        Skills:
        - Python
        - APIs
        - Automation (n8n, workflows)
        - AI tools (Gemini, OpenAI)
        - Web automation
        
        Services:
        - AI chatbot development
        - Customer support automation
        - Lead generation systems
        - Email outreach automation
        - Workflow automation for businesses
        
        Projects:
        - AI customer support chatbot (WhatsApp + website)
        - Email outreach automation system (scraping + sending emails)
        - API-based automation workflows
        
        Contact:
        - Email: growtoglow44@gmail.com
        
        Response Rules:
        - Short and clear answers.
        - Professional but friendly tone.
        - No hallucinations.
        - If unsure → redirect to contact email: growtoglow44@gmail.com.
        - Focus on conversion (turn visitors into leads).
        - Avoid long paragraphs.
        - Be concise and helpful.
      `,
    });

    // Format chat history for Gemini
    // Gemini expects [{ role: "user", parts: [{ text: "..." }] }, { role: "model", parts: [{ text: "..." }] }]
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ content: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
