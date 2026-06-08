const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { auditEngine } = require('./src/auditEngine');
const { sendEmail } = require('./src/emailSender');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/v1/audit', async (req, res) => {
  const { email, url } = req.body;
  if (!email || !url) {
    return res.status(400).json({ error: 'Email and URL are required' });
  }

  try {
    const results = await auditEngine(url);
    
    // Concurrently send the email using Resend
    sendEmail(email, url, results).catch(console.error);

    res.json(results);
  } catch (error) {
    console.error('Audit Error:', error);
    res.status(500).json({ error: 'Failed to process audit' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
