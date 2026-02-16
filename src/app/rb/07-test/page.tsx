'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step07Test() {
  const buildPrompt = `Add testing: unit tests, integration tests, and user acceptance testing scenarios.`;

  return (
    <PremiumLayout currentStep={7} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 7: Testing</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Quality Assurance</h2>
          <p className="text-gray-700">
            Test all features, edge cases, and user flows to ensure reliability.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
