import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

async function test() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Velvet Logic <noreply@velvetlogicagency.com>',
      to: "test@gmail.com",
      subject: 'Test',
      html: '<p>Test</p>'
    });
    console.log("Resend data:", data);
    console.log("Resend error:", error);
  } catch(e) {
    console.error("Caught error:", e);
  }
}
test();
