import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormAutoReplyProps {
  name: string;
}

export const ContactFormAutoReply = ({
  name = 'John',
}: ContactFormAutoReplyProps) => {
  const previewText = `We received your inquiry - Velvet Logic`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Note: You can replace this src with your hosted logo URL in Resend */}
          <Img
            src="https://velvetlogicagency.com/velvet_logic_logo.svg"
            width="150"
            alt="Velvet Logic"
            style={logo}
          />
          
          <Heading style={h1}>Thank you, {name}!</Heading>
          
          <Text style={text}>
            We have received your project inquiry and our team will review it shortly. 
          </Text>
          
          <Text style={text}>
            At Velvet Logic, we specialize in building digital flagships that convert. 
            One of our lead engineers or strategists will be in touch with you within 
            the next <strong>24 business hours</strong> to discuss the next steps.
          </Text>

          <Section style={ctaContainer}>
            <Link href="https://velvetlogicagency.com" style={button}>
              Visit Our Website
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Velvet Logic Agency<br />
            Forward-thinking web design & high-performance development.<br />
            <Link href="mailto:hello@velvetlogicagency.com" style={footerLink}>
              hello@velvetlogicagency.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormAutoReply;

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#111111',
  margin: '0 auto',
  padding: '40px',
  borderRadius: '16px',
  border: '1px solid #333333',
  maxWidth: '600px',
};

const logo = {
  margin: '0 auto 32px auto',
  display: 'block',
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#a3a3a3',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
};

const ctaContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#ffffff',
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  padding: '16px 32px',
  borderRadius: '8px',
  display: 'inline-block',
};

const hr = {
  borderColor: '#333333',
  margin: '40px 0 32px 0',
};

const footer = {
  color: '#737373',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center' as const,
};

const footerLink = {
  color: '#d27dff',
  textDecoration: 'none',
};
