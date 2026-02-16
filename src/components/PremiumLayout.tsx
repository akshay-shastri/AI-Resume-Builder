'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getArtifact } from '@/lib/artifacts';
import { CheckCircle2, Circle, Copy } from 'lucide-react';

interface PremiumLayoutProps {
  children: ReactNode;
  currentStep: number;
  buildPrompt?: string;
}

const steps = [
  { num: 1, path: '/rb/01-problem', label: 'Problem' },
  { num: 2, path: '/rb/02-market', label: 'Market' },
  { num: 3, path: '/rb/03-architecture', label: 'Architecture' },
  { num: 4, path: '/rb/04-hld', label: 'HLD' },
  { num: 5, path: '/rb/05-lld', label: 'LLD' },
  { num: 6, path: '/rb/06-build', label: 'Build' },
  { num: 7, path: '/rb/07-test', label: 'Test' },
  { num: 8, path: '/rb/08-ship', label: 'Ship' },
];

export default function PremiumLayout({ children, currentStep, buildPrompt }: PremiumLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const artifact = getArtifact(currentStep);
  const canProceed = !!artifact;

  const handleNext = () => {
    if (!canProceed) return;
    if (currentStep < 8) {
      router.push(steps[currentStep].path);
    } else {
      router.push('/rb/proof');
    }
  };

  const copyPrompt = () => {
    if (buildPrompt) {
      navigator.clipboard.writeText(buildPrompt);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="font-semibold text-gray-900">AI Resume Builder</div>
        <div className="text-sm text-gray-600">Project 3 — Step {currentStep} of 8</div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          artifact ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {artifact ? 'Complete' : 'In Progress'}
        </div>
      </div>

      {/* Context Header */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-2">
        <div className="flex items-center gap-4 text-sm">
          {steps.map((step) => (
            <div key={step.num} className="flex items-center gap-1">
              {getArtifact(step.num) ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : (
                <Circle className="w-4 h-4 text-gray-400" />
              )}
              <span className={step.num === currentStep ? 'font-semibold text-blue-900' : 'text-gray-600'}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Main Workspace (70%) */}
        <div className="w-[70%] p-6 overflow-auto">
          {children}
        </div>

        {/* Secondary Build Panel (30%) */}
        <div className="w-[30%] bg-white border-l border-gray-200 p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900">Build Panel</h3>
          
          {buildPrompt && (
            <>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-sm font-mono text-gray-700 max-h-48 overflow-auto">
                {buildPrompt}
              </div>
              <button
                onClick={copyPrompt}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <Copy className="w-4 h-4" />
                Copy This Into Lovable
              </button>
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Build in Lovable
              </a>
            </>
          )}

          <div className="border-t border-gray-200 pt-4 mt-auto">
            <p className="text-sm text-gray-600 mb-3">Upload artifact to proceed:</p>
            <div className="flex flex-col gap-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                It Worked
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
                Error
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm">
                Add Screenshot
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Footer */}
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => router.push('/rb/proof')}
          className="text-sm hover:text-blue-300"
        >
          View Proof Page
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`px-6 py-2 rounded font-medium ${
            canProceed
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep < 8 ? 'Next Step' : 'Go to Proof'}
        </button>
      </div>
    </div>
  );
}
