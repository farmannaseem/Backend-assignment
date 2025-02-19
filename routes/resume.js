const express = require('express');
const axios = require('axios');
const verifyToken = require('../utils/verifyToken');
const Applicant = require('../models/applicant');

const router = express.Router();

router.post('/enrich', verifyToken, async (req, res) => {
  const { raw_text } = req.body;
  if (!raw_text) return res.status(404).json({ error: 'No data detected' });

  try {
    const response = await axios.post('https://api.gemini.com/v1/llm', {
      prompt: `Extract resume data: ${raw_text}`,
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { name, email, education, experience, skills, summary } = response.data;

    const applicant = new Applicant({
      name,
      email,
      education,
      experience,
      skills,
      summary,
    });

    await applicant.save();
    res.status(200).json(applicant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process resume data' });
  }
});

module.exports = router; 