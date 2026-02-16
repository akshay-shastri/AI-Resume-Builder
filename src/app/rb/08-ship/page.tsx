'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step08Ship() {
  const buildPrompt = `Deploy the application to production with CI/CD pipeline and monitoring.`;

  return (
    <PremiumLayout currentStep={8} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 8: Ship to Production</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Deployment</h2>
          <p className="text-gray-700">
            Deploy to Vercel/Netlify, set up domain, configure environment variables, and launch.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
