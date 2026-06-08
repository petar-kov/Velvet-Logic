import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function AuditForm({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.formAction = undefined; // Prevent default form sub
    e.preventDefault();
    if (email && url) {
      onSubmit(email, url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate">
          Website URL
        </label>
        <div className="mt-1">
          <input
            id="url"
            name="url"
            type="text"
            required
            placeholder="e.g. velvetlogicagency.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy focus:border-navy transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate">
          Business Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-navy focus:border-navy transition-colors"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          We'll send an in-depth version of the report to this email.
        </p>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-cta hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none disabled:hover:bg-cta"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
              Scanning Domain...
            </>
          ) : (
            <>
              <Search className="-ml-1 mr-3 h-6 w-6 text-white" />
              Generate Free Audit
            </>
          )}
        </button>
      </div>
    </form>
  );
}
