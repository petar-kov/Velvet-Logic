import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key_for_dev');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, companyName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Velvet Logic <onboarding@resend.dev>', // Resend testing domain
      to: ['your-email@example.com'], // The user's email goes here (simulated for dev)
      subject: `New Project Inquiry from ${fullName}`,
      html: `
        <h2>New Inquiry from Velvet Logic Landing Page</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <br/>
        <h3>Message:</h3>
        <p>${message}</p>
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
}
