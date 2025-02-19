const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: {
    degree: String,
    branch: String,
    institution: String,
    year: String,
  },
  experience: {
    job_title: String,
    company: String,
  },
  skills: [String],
  summary: String,
});

module.exports = mongoose.model('Applicant', applicantSchema); 