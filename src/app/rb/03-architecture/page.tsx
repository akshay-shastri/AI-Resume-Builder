'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step03Architecture() {
  const buildPrompt = `Design the system architecture with frontend, backend API, AI service, and database components.`;

  return (
    <PremiumLayout currentStep={3} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 3: System Architecture</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Architecture Overview</h2>
          <p className="text-gray-700">
            React frontend, Node.js backend, OpenAI integration, PostgreSQL database.
          </p>
        </div>
      </div>
    </PremiumLayout>
  );
}
