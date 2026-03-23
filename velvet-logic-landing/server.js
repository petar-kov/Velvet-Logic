import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {
  const { fullName, companyName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Velvet Logic <noreply@velvetlogicagency.com>',
      to: [process.env.VITE_CONTACT_EMAIL],
      replyTo: email,
      subject: `New Project Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #d27dff;">New Inquiry from Velvet Logic Landing Page</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ message: 'Failed to send email', error });
    }

    return res.status(200).json({ message: 'Success', id: data.id });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
