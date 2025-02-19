const express = require('express');
const verifyToken = require('../utils/verifyToken');
const Applicant = require('../models/applicant');

const router = express.Router();

router.post('/search', verifyToken, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const applicants = await Applicant.find({
      name: { $regex: new RegExp(name, 'i') },
    });

    if (applicants.length === 0) return res.status(404).json({ error: 'No matching records found' });

    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search for resumes' });
  }
});

module.exports = router; 