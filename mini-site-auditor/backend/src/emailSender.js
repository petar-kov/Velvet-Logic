const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789'); // Dummy key if env var missing

async function sendEmail(email, url, results) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('No RESEND_API_KEY found, skipping email send.');
    return;
  }

  const { totalScore, scores, deductions, impacts } = results;

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; margin-bottom: 32px;">
        <h2 style="color: #f97316; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Velvet Logic Diagnostic</h2>
        <h1 style="color: #ffffff; margin: 10px 0 0 0; font-size: 28px;">Website Audit Report</h1>
        <p style="color: #94a3b8; font-size: 16px; margin-top: 8px;">Domain: <strong>${url}</strong></p>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; border: 4px solid ${totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#ef4444'}; border-radius: 50%; width: 120px; height: 120px; line-height: 120px;">
          <span style="font-size: 48px; font-weight: bold; color: ${totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#ef4444'};">${totalScore}</span>
        </div>
        <p style="color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 12px;">Total Score out of 100</p>
      </div>

      <div style="background-color: rgba(255,255,255,0.03); padding: 24px; border-radius: 12px; margin-bottom: 24px;">
        <h3 style="color: #ffffff; margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">Category Breakdown</h3>
        <table style="width: 100%; color: #cbd5e1; font-size: 15px;">
          <tr><td style="padding: 8px 0;">Conversion & Trust:</td><td style="text-align: right; font-weight: bold;">${scores.conversion}/25</td></tr>
          <tr><td style="padding: 8px 0;">Local SEO & Tech:</td><td style="text-align: right; font-weight: bold;">${scores.seo}/25</td></tr>
          <tr><td style="padding: 8px 0;">AI Search (GEO):</td><td style="text-align: right; font-weight: bold;">${scores.geo_aeo}/25</td></tr>
          <tr><td style="padding: 8px 0;">Compliance Risks:</td><td style="text-align: right; font-weight: bold;">${scores.compliance}/25</td></tr>
        </table>
      </div>

      ${impacts.length > 0 ? `
      <div style="background-color: rgba(239,68,68,0.1); border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 24px; border-radius: 0 12px 12px 0;">
        <h3 style="color: #fca5a5; margin-top: 0; font-size: 16px; text-transform: uppercase;">Business Impact Warnings</h3>
        ${impacts.map(i => `<p style="color: #fecaca; font-size: 15px; margin: 8px 0;">• ${i}</p>`).join('')}
      </div>` : ''}

      <div style="margin-bottom: 32px;">
        <h3 style="color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">Critical Deductions</h3>
        <ul style="color: #cbd5e1; font-size: 15px; line-height: 1.6; padding-left: 20px;">
          ${Object.values(deductions).flat().map(d => `<li style="margin-bottom: 8px;">${d}</li>`).join('')}
        </ul>
      </div>

      <div style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px;">
        <h3 style="color: #ffffff; margin-top: 0;">Stop the Lead Bleed.</h3>
        <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">Your website is currently leaking traffic to your competitors. Reply directly to this email to book a free technical consultation with our lead engineers.</p>
        <a href="https://velvetlogicagency.com" style="display: inline-block; background-color: #f97316; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">Fix My Website</a>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Velvet Logic Auditor <noreply@velvetlogicagency.com>',
      to: email,
      subject: `Your Velvet Logic Website Audit - ${totalScore}/100`,
      html: html,
    });
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
