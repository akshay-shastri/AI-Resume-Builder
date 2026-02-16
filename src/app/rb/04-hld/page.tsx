'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step04HLD() {
  const buildPrompt = `Create high-level design showing user flow, data flow, and component interactions.`;

  return (
    <PremiumLayout currentStep={4} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 4: High-Level Design</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Component Design</h2>
          <p className="text-gray-700">
            User authentication, resume editor, AI optimizer, template selector, PDF generator.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
