'use client';

import PremiumLayout from '@/components/PremiumLayout';

export default function Step01Problem() {
  const buildPrompt = `Create a landing page for an AI Resume Builder with a hero section, features list, and CTA button.`;

  return (
    <PremiumLayout currentStep={1} buildPrompt={buildPrompt}>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Problem Definition</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">What problem are we solving?</h2>
          <p className="text-gray-700">
            Job seekers struggle to create professional, ATS-friendly resumes that stand out to recruiters.
            Traditional resume builders lack AI-powered optimization and modern design templates.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm text-blue-900">
              <strong>Goal:</strong> Build an AI-powered resume builder that helps users create optimized,
              professional resumes in minutes.
            </p>
          </div>
        </div>
      </div>
    </PremiumLayout>
  );
}
