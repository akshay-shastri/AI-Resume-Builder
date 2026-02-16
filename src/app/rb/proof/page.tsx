'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, Copy } from 'lucide-react';
import { getAllStepStatuses, getProofLinks, saveProofLinks } from '@/lib/artifacts';

export default function ProofPage() {
  const router = useRouter();
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [lovable, setLovable] = useState('');
  const [github, setGithub] = useState('');
  const [deploy, setDeploy] = useState('');

  useEffect(() => {
    setStatuses(getAllStepStatuses());
    const links = getProofLinks();
    setLovable(links.lovable);
    setGithub(links.github);
    setDeploy(links.deploy);
  }, []);

  const handleSave = () => {
    saveProofLinks(lovable, github, deploy);
    alert('Links saved!');
  };

  const copySubmission = () => {
    const submission = `AI Resume Builder - Project 3 Submission

Lovable Link: ${lovable}
GitHub Link: ${github}
Deploy Link: ${deploy}

Step Completion:
${statuses.map((done, i) => `Step ${i + 1}: ${done ? '✓' : '✗'}`).join('\n')}`;
    
    navigator.clipboard.writeText(submission);
    alert('Submission copied to clipboard!');
  };

  const allComplete = statuses.every(s => s);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Project 3 Proof Page</h1>

        {/* Step Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Build Track Progress</h2>
          <div className="grid grid-cols-4 gap-4">
            {['Problem', 'Market', 'Architecture', 'HLD', 'LLD', 'Build', 'Test', 'Ship'].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                {statuses[i] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <span className={statuses[i] ? 'text-green-900 font-medium' : 'text-gray-500'}>
                  {i + 1}. {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Links */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submission Links</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Link</label>
              <input
                type="url"
                value={lovable}
                onChange={(e) => setLovable(e.target.value)}
                placeholder="https://lovable.dev/projects/..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deploy Link</label>
              <input
                type="url"
                value={deploy}
                onChange={(e) => setDeploy(e.target.value)}
                placeholder="https://your-app.vercel.app"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Links
            </button>
            <button
              onClick={copySubmission}
              disabled={!allComplete}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded ${
                allComplete
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Copy className="w-4 h-4" />
              Copy Final Submission
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push('/rb/01-problem')}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Back to Step 1
          </button>
          {!allComplete && (
            <p className="text-sm text-red-600 self-center">Complete all 8 steps to submit</p>
          )}
        </div>
      </div>
    </div>
  );
}
