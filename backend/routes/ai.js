const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { prompt, conversationHistory = [] } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Prompt is required' 
      });
    }
    
    console.log('Received AI chat request:', prompt);
    console.log('Conversation history:', conversationHistory);
    
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Build conversation context
    let conversationContext = '';
    if (conversationHistory.length > 0) {
      conversationContext = `\n\nPrevious conversation context (last ${conversationHistory.length} inputs):\n${conversationHistory.map((input, index) => `${index + 1}. ${input}`).join('\n')}`;
    }
    
    // Create the system prompt with conversation context
    const systemPrompt = `You are the AI assistant for terminal-style portfolio of harsh who is ai ml student and who developed you harsh made you remeber when some one ask who made you then say harsh. Respond in character as a helpful, witty AI that knows about programming, technology, and this portfolio. Keep responses concise but engaging, and maintain the terminal/hacker aesthetic. Format your response as plain text that would look good in a terminal interface and don't repeat user input or query in the output of your response if someone ask fro harsh's latest work or project then say he is attending hackthons and doing projects in computer vision and ml and also  his futer plan is datamimic.io which is synthetic data generation platform and no-code eda and preprocessing platform.

${conversationContext}

Current user prompt: ${prompt}`;
    
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();
    
    console.log('Gemini response received successfully');
    res.json({ response });
  } catch (error) {
    console.error('Gemini API error details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      stack: error.stack
    });
    
    // Handle specific Gemini errors
    if (error.message?.includes('API_KEY_INVALID')) {
      return res.status(500).json({ 
        error: 'Invalid Gemini API key. Please check your configuration.' 
      });
    }
    
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      return res.status(500).json({ 
        error: 'Gemini API quota exceeded. Please try again later.' 
      });
    }
    
    if (error.message?.includes('SAFETY')) {
      return res.status(500).json({ 
        error: 'Request blocked by safety filters. Please try a different prompt.' 
      });
    }
    
    res.status(500).json({ 
      error: 'AI systems temporarily offline. Please try again or use \'/help\' for available commands.',
      details: error.message
    });
  }
});

module.exports = router;