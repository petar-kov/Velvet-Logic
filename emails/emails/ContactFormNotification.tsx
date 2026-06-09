import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactFormNotificationProps {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactFormNotification = ({
  fullName = 'John Doe',
  companyName = 'Acme Corp',
  email = 'john@example.com',
  phone = '+1 234 567 8900',
  message = 'Hi, I need help redesigning our outdated agency website to improve conversion rates.',
}: ContactFormNotificationProps) => {
  const previewText = `New Project Inquiry from ${fullName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Inquiry Received 🚀</Heading>
          <Text style={text}>
            You have received a new project inquiry from the Velvet Logic landing page.
          </Text>

          <Section style={detailsSection}>
            <Text style={label}>Name</Text>
            <Text style={value}>{fullName}</Text>

            <Text style={label}>Company</Text>
            <Text style={value}>{companyName || 'N/A'}</Text>

            <Text style={label}>Email</Text>
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>

            <Text style={label}>Phone</Text>
            <Text style={value}>{phone || 'N/A'}</Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactFormNotification;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '40px auto',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  maxWidth: '600px',
};

const h1 = {
  color: '#d27dff',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 20px 0',
  padding: '0',
};

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px 0',
};

const detailsSection = {
  backgroundColor: '#f8fafc',
  padding: '24px',
  borderRadius: '8px',
  marginBottom: '24px',
};

const label = {
  color: '#64748b',
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 4px 0',
};

const value = {
  color: '#0f172a',
  fontSize: '16px',
  margin: '0 0 16px 0',
  fontWeight: '500',
};

const link = {
  color: '#d27dff',
  fontSize: '16px',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '16px',
  fontWeight: '500',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0',
};

const messageText = {
  color: '#0f172a',
  fontSize: '16px',
  lineHeight: '26px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f8fafc',
  padding: '20px',
  borderRadius: '8px',
  borderLeft: '4px solid #d27dff',
};
