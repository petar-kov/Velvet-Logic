import { useState } from 'react';
import AuditForm from './components/AuditForm';
import AuditResults from './components/AuditResults';

function App() {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAudit = async (email, url) => {
    setLoading(true);
    setError('');
    setAuditData(null);

    try {
      // Assuming backend runs on localhost:3001 in dev
      const response = await fetch('http://localhost:3001/api/v1/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, url })
      });

      if (!response.ok) {
        throw new Error('Audit request failed');
      }

      const data = await response.json();
      setAuditData(data);
    } catch (err) {
      setError('Failed to generate audit. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAudit = () => {
    setAuditData(null);
  };

  return (
    <div className="min-h-screen bg-mercury text-obsidian flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate sm:text-5xl">
            Mini Site <span className="text-navy">Auditor</span>
          </h1>
          <p className="mt-3 text-xl text-secondary">
            Get an instant, actionable breakdown of your website's performance and conversion health.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {!auditData ? (
          <div className="bg-surface rounded-2xl shadow-xl p-8 border border-gray-100">
            <AuditForm onSubmit={handleAudit} isLoading={loading} />
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={resetAudit}
              className="text-navy hover:text-blue-800 font-medium mb-4 inline-flex items-center transition-colors"
            >
              &larr; Run Another Audit
            </button>
            <AuditResults data={auditData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
