'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step02Market() {
  const buildPrompt = `Add a market analysis section showing target users, competitors, and unique value proposition.`;

  return (
    <PremiumLayout currentStep={2} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 2: Market Research</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Target Market</h2>
          <p className="text-gray-700">
            Recent graduates, career changers, and professionals seeking better opportunities.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
