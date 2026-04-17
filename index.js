const express = require('express');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Groq = require('groq-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Models
const User = require('./models/User');
const Resume = require('./models/Resume');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '.')));

// Database Connection (OPTIONAL now, won't crash the server if missing)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/resumeforge', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.warn('⚠️ MongoDB connection failed. Auth and Persistence disabled, but AI scanning remains active.');
  });

// Multer storage for resume uploads (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Gemini (Fallback)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSync_placeholder');

// --- AUTH MIDDLEWARE ---
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findOne({ _id: decoded.id });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// --- ROUTES ---

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', engine: 'Resume Forge AI SDK v1.2' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: Date.now() });
});

// 1. Sign Up
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password: await bcrypt.hash(password, 8) });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ user, token });
  } catch (e) {
    res.status(500).json({ error: 'Database operations require MongoDB to be running.' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
    res.json({ user, token });
  } catch (e) {
    res.status(401).json({ error: 'Login failed. Check MongoDB if server is newly started.' });
  }
});

// 3. Resume State
app.post('/api/resume/save', auth, async (req, res) => {
  try {
    await Resume.findOneAndUpdate({ userId: req.user._id }, { resumeData: req.body }, { upsert: true });
    res.json({ message: 'Saved' });
  } catch (e) { res.status(500).json({ error: 'Database unavailable' }); }
});

app.get('/api/resume/load', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    res.json(resume ? resume.resumeData : null);
  } catch (e) { res.status(500).json({ error: 'Database unavailable' }); }
});

// 🚀 ATS: EXTRACT TEXT FROM PDF
app.post('/api/ats/extract', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (e) { res.status(500).json({ error: 'Text extraction failed' }); }
});

// 🧠 AI ENGINE (Supports both Groq and Gemini)
app.post('/api/ats/analyze', async (req, res) => {
  const { text, jobDescription, apiKey } = req.body;
  
  // Find a valid key (ignore placeholders)
  const isVal = (k) => k && !k.includes('your') && !k.includes('placeholder');
  let activeKey = isVal(apiKey) ? apiKey : (isVal(process.env.GROQ_API_KEY) ? process.env.GROQ_API_KEY : (isVal(process.env.GEMINI_API_KEY) ? process.env.GEMINI_API_KEY : null));

  if (!activeKey) {
    return res.status(400).json({ error: 'NO_API_KEY', msg: 'Please provide a Groq or Gemini API key in settings.' });
  }

  try {
    // 1. Groq Path
    if (activeKey.startsWith('gsk_')) {
      const groq = new Groq({ apiKey: activeKey });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze this resume text and compare it with the job description. Return JSON with the following keys: score (0-100), matchedKeywords (array), missingKeywords (array), strengths (array), improvementTips (array), overallFeedback (string). \n\nResume Text: ${text} \n\nJob Description: ${jobDescription || "N/A"}` }],
        model: "llama3-8b-8192",
        response_format: { type: "json_object" }
      });
      return res.json(JSON.parse(completion.choices[0].message.content));
    }

    // 2. Gemini Path
    const currentGenAI = (activeKey === process.env.GEMINI_API_KEY) ? genAI : new GoogleGenerativeAI(activeKey);
    const model = currentGenAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { response_mime_type: "application/json" }
    });
    
    const prompt = `Analyze this resume text against the job description for ATS optimization. 
    Resume: ${text} 
    JD: ${jobDescription || "N/A"}
    
    Return a strictly valid JSON object: {score, matchedKeywords, missingKeywords, strengths, improvementTips, overallFeedback}.`;

    const result = await model.generateContent(prompt);
    const analysis = JSON.parse(result.response.text());
    res.json(analysis);

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

// 🤖 AI CHAT (Conversational Assistant)
app.post('/api/ai/chat', async (req, res) => {
  const { message, resumeContext, apiKey } = req.body;
  const activeKey = apiKey || process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;

  if (!activeKey || activeKey.includes('your')) {
    return res.status(400).json({ error: 'NO_API_KEY', msg: 'Server has no API key configured.' });
  }

  try {
    const prompt = `You are "Antigravity", a world-class AI Career Coach. 
    Resume Context: ${JSON.stringify(resumeContext)}
    
    User says: "${message}"
    
    Provide a professional, encouraging, and highly specific response in Markdown.`;

    if (activeKey.startsWith('gsk_')) {
      const groq = new Groq({ apiKey: activeKey });
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-8b-8192"
      });
      return res.json({ reply: completion.choices[0].message.content });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error('Chat AI Error:', error);
    res.status(500).json({ error: 'Chat failed', details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 AI Server running on port ${port}`);
});
