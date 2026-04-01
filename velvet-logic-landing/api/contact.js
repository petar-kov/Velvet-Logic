import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, companyName, email, phone, message, lang } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const isSrb = lang === 'SRB';

  try {
    // 1. Email to Website Owner
    const { data, error } = await resend.emails.send({
      from: 'Velvet Logic <noreply@velvetlogicagency.com>',
      to: [process.env.RESEND_TO_EMAIL || process.env.VITE_CONTACT_EMAIL],
      replyTo: email,
      subject: isSrb ? `Novi Upit: ${fullName}` : `New Project Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #d27dff;">${isSrb ? 'Novi Upit sa Velvet Logic Landing Stranice' : 'New Inquiry from Velvet Logic Landing Page'}</h2>
          <p><strong>${isSrb ? 'Ime' : 'Name'}:</strong> ${fullName}</p>
          <p><strong>${isSrb ? 'Kompanija' : 'Company'}:</strong> ${companyName || 'N/A'}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>${isSrb ? 'Telefon' : 'Phone'}:</strong> ${phone || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #333;">${isSrb ? 'Poruka' : 'Message'}:</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ message: 'Failed to send email', error });
    }

    // 2. Auto-responder to the User
    try {
      const srbTemplateId = process.env.RESEND_TEMPLATE_SRB;
      const engTemplateId = process.env.RESEND_TEMPLATE_ENG;

      if (srbTemplateId && engTemplateId) {
        await resend.emails.send({
          from: 'Velvet Logic <noreply@velvetlogicagency.com>',
          to: email,
          subject: isSrb ? 'Vaš upit je primljen - Velvet Logic' : 'Your inquiry has been received - Velvet Logic',
          template: {
            id: isSrb ? srbTemplateId : engTemplateId,
            variables: {
              name: fullName
            }
          }
        });
      } else {
        // Fallback to basic HTML if they haven't added the IDs to .env yet
        await resend.emails.send({
          from: 'Velvet Logic <noreply@velvetlogicagency.com>',
          to: email,
          subject: isSrb ? 'Vaš upit je primljen - Velvet Logic' : 'Your inquiry has been received - Velvet Logic',
          html: isSrb 
            ? `<div style="font-family: Arial, sans-serif; color: #333;">
                 <h2>Hvala vam, ${fullName}!</h2>
                 <p>Primili smo vaš upit i pregledaćemo ga u najkraćem roku.</p>
                 <p>Naš tim obično odgovara u roku od 24 radna sata.</p>
               </div>`
            : `<div style="font-family: Arial, sans-serif; color: #333;">
                 <h2>Thank you, ${fullName}!</h2>
                 <p>We have received your inquiry and will review it shortly.</p>
                 <p>Our team usually responds within 24 business hours.</p>
               </div>`
        });
      }
    } catch (autoReplyErr) {
      console.error('Failed to send auto-reply to user:', autoReplyErr);
      // We don't fail the entire request just because auto-reply failed
    }

    return res.status(200).json({ message: 'Success', id: data.id });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}

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
