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

interface WebsiteAuditReportProps {
  url: string;
  totalScore: number;
  scores: {
    conversion: number;
    seo: number;
    geo_aeo: number;
    compliance: number;
  };
  deductions: Record<string, string[]>;
  impacts: string[];
}

export const WebsiteAuditReport = ({
  url = 'example.com',
  totalScore = 65,
  scores = {
    conversion: 15,
    seo: 18,
    geo_aeo: 12,
    compliance: 20,
  },
  deductions = {
    conversion: ['Missing clear CTA above the fold.', 'Slow initial page load.'],
    seo: ['Missing meta descriptions on key pages.'],
  },
  impacts = [
    'You are losing approximately 35% of potential leads due to poor mobile experience.',
    'Competitors are outranking you for local search terms.',
  ],
}: WebsiteAuditReportProps) => {
  const previewText = `Your Velvet Logic Website Audit - ${totalScore}/100`;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const scoreColor = getScoreColor(totalScore);

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={eyebrow}>Velvet Logic Diagnostic</Text>
            <Heading style={h1}>Website Audit Report</Heading>
            <Text style={domainText}>
              Domain: <strong>{url}</strong>
            </Text>
          </Section>

          <Section style={scoreSection}>
            <div
              style={{
                ...scoreCircle,
                borderColor: scoreColor,
                color: scoreColor,
              }}
            >
              {totalScore}
            </div>
            <Text style={scoreLabel}>Total Score out of 100</Text>
          </Section>

          <Section style={card}>
            <Heading style={cardTitle}>Category Breakdown</Heading>
            <table style={table}>
              <tbody>
                <tr>
                  <td style={tdLeft}>Conversion & Trust:</td>
                  <td style={tdRight}>{scores.conversion}/25</td>
                </tr>
                <tr>
                  <td style={tdLeft}>Local SEO & Tech:</td>
                  <td style={tdRight}>{scores.seo}/25</td>
                </tr>
                <tr>
                  <td style={tdLeft}>AI Search (GEO):</td>
                  <td style={tdRight}>{scores.geo_aeo}/25</td>
                </tr>
                <tr>
                  <td style={tdLeft}>Compliance Risks:</td>
                  <td style={tdRight}>{scores.compliance}/25</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {impacts && impacts.length > 0 && (
            <Section style={impactSection}>
              <Heading style={impactTitle}>Business Impact Warnings</Heading>
              {impacts.map((impact, idx) => (
                <Text key={idx} style={impactText}>
                  • {impact}
                </Text>
              ))}
            </Section>
          )}

          <Section style={deductionsSection}>
            <Heading style={cardTitle}>Critical Deductions</Heading>
            <ul style={ul}>
              {Object.values(deductions)
                .flat()
                .map((deduction, idx) => (
                  <li key={idx} style={li}>
                    {deduction}
                  </li>
                ))}
            </ul>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Heading style={ctaTitle}>Stop the Lead Bleed.</Heading>
            <Text style={ctaText}>
              Your website is currently leaking traffic to your competitors. Reply directly to this email to book a free technical consultation with our lead engineers.
            </Text>
            <Link href="https://velvetlogicagency.com" style={button}>
              Fix My Website
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WebsiteAuditReport;

const main = {
  backgroundColor: '#0f172a',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#1e293b',
  margin: '0 auto',
  padding: '40px',
  borderRadius: '16px',
  border: '1px solid #334155',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  paddingBottom: '24px',
  marginBottom: '32px',
};

const eyebrow = {
  color: '#f97316',
  margin: '0',
  fontSize: '14px',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
};

const h1 = {
  color: '#ffffff',
  margin: '10px 0 0 0',
  fontSize: '28px',
};

const domainText = {
  color: '#94a3b8',
  fontSize: '16px',
  marginTop: '8px',
};

const scoreSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const scoreCircle = {
  display: 'inline-block',
  borderWidth: '4px',
  borderStyle: 'solid',
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  lineHeight: '112px',
  fontSize: '48px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  boxSizing: 'border-box' as const,
};

const scoreLabel = {
  color: '#94a3b8',
  fontSize: '14px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  marginTop: '12px',
};

const card = {
  backgroundColor: 'rgba(255,255,255,0.03)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '24px',
};

const cardTitle = {
  color: '#ffffff',
  marginTop: '0',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  paddingBottom: '12px',
  fontSize: '18px',
};

const table = {
  width: '100%',
  color: '#cbd5e1',
  fontSize: '15px',
};

const tdLeft = {
  padding: '8px 0',
};

const tdRight = {
  textAlign: 'right' as const,
  fontWeight: 'bold',
};

const impactSection = {
  backgroundColor: 'rgba(239,68,68,0.1)',
  borderLeft: '4px solid #ef4444',
  padding: '20px',
  marginBottom: '24px',
  borderRadius: '0 12px 12px 0',
};

const impactTitle = {
  color: '#fca5a5',
  marginTop: '0',
  fontSize: '16px',
  textTransform: 'uppercase' as const,
};

const impactText = {
  color: '#fecaca',
  fontSize: '15px',
  margin: '8px 0',
};

const deductionsSection = {
  marginBottom: '32px',
};

const ul = {
  color: '#cbd5e1',
  fontSize: '15px',
  lineHeight: '1.6',
  paddingLeft: '20px',
  margin: '0',
};

const li = {
  marginBottom: '8px',
};

const hr = {
  borderColor: 'rgba(255,255,255,0.1)',
  margin: '32px 0',
};

const ctaSection = {
  textAlign: 'center' as const,
};

const ctaTitle = {
  color: '#ffffff',
  marginTop: '0',
  fontSize: '22px',
};

const ctaText = {
  color: '#94a3b8',
  fontSize: '15px',
  lineHeight: '1.6',
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#f97316',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '16px 32px',
  borderRadius: '8px',
  display: 'inline-block',
};
