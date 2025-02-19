const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { encrypt, decrypt } = require('../utils/encryption');

const router = express.Router();

const hardCodedUser = {
  username: 'naval.ravikant',
  password: encrypt('05111974'),
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === hardCodedUser.username && decrypt(hardCodedUser.password, password)) {
    const token = jwt.sign({ id: username }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ JWT: token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router; 