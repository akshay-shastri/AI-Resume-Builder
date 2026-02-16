'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step05LLD() {
  const buildPrompt = `Design low-level details: API endpoints, database schema, component structure, state management.`;

  return (
    <PremiumLayout currentStep={5} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 5: Low-Level Design</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Technical Specifications</h2>
          <p className="text-gray-700">
            API routes, database tables, React components, hooks, and utility functions.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
