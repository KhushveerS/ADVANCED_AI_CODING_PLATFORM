import express from 'express';
import gemini from '../services/geminiService';

const router = express.Router();

router.get('/ai/health', (req, res) => {
  res.json({ success: true, configured: gemini.isConfigured() });
});

router.post('/ai/explain', async (req, res) => {
  try {
    const { title, url, details } = req.body || {};
    if (!title) return res.status(400).json({ success: false, message: 'title required' });
    const text = await gemini.generateExplanation({ title, url, details });
    res.json({ success: true, data: text });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message || 'AI error' });
  }
});

router.post('/ai/hints', async (req, res) => {
  try {
    const { title, url, currentThought } = req.body || {};
    if (!title) return res.status(400).json({ success: false, message: 'title required' });
    const text = await gemini.generateHints({ title, url, currentThought });
    res.json({ success: true, data: text });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message || 'AI error' });
  }
});

router.post('/ai/solution', async (req, res) => {
  try {
    const { title, url, language } = req.body || {};
    if (!title || !language) return res.status(400).json({ success: false, message: 'title and language required' });
    if (!['c', 'cpp', 'java'].includes(language)) return res.status(400).json({ success: false, message: 'language must be c | cpp | java' });
    const text = await gemini.generateSolution({ title, url, language });
    res.json({ success: true, data: text });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message || 'AI error' });
  }
});

export default router;


