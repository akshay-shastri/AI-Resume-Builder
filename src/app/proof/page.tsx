'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { 
  saveProofSubmission, 
  getProofSubmission, 
  getStepCompletions, 
  saveStepCompletion,
  getAllStepsCompleted,
  getChecklistStatus,
  setChecklistStatus,
  isProjectShipped,
  validateURL 
} from '@/lib/proofSubmission';
import { CheckCircle2, Circle, Copy, AlertCircle } from 'lucide-react';

const steps = [
  { num: 1, label: 'Problem Definition' },
  { num: 2, label: 'Market Research' },
  { num: 3, label: 'System Architecture' },
  { num: 4, label: 'High-Level Design' },
  { num: 5, label: 'Low-Level Design' },
  { num: 6, label: 'Build Implementation' },
  { num: 7, label: 'Testing' },
  { num: 8, label: 'Ship to Production' },
];

const checklistItems = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work (copy/download)',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
];

export default function ProofPage() {
  const [lovableLink, setLovableLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployedLink, setDeployedLink] = useState('');
  const [stepStatus, setStepStatus] = useState<{ [key: string]: boolean }>({});
  const [checklistPassed, setChecklistPassedState] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [copySuccess, setCopySuccess] = useState(false);
  const [shipped, setShipped] = useState(false);

  useEffect(() => {
    const submission = getProofSubmission();
    if (submission) {
      setLovableLink(submission.lovableLink);
      setGithubLink(submission.githubLink);
      setDeployedLink(submission.deployedLink);
    }
    setStepStatus(getStepCompletions());
    setChecklistPassedState(getChecklistStatus());
    setShipped(isProjectShipped());
  }, []);

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!lovableLink || !validateURL(lovableLink)) {
      newErrors.lovable = 'Valid URL required (must start with http:// or https://)';
    }
    if (!githubLink || !validateURL(githubLink)) {
      newErrors.github = 'Valid URL required (must start with http:// or https://)';
    }
    if (!deployedLink || !validateURL(deployedLink)) {
      newErrors.deployed = 'Valid URL required (must start with http:// or https://)';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      saveProofSubmission({
        lovableLink,
        githubLink,
        deployedLink,
        timestamp: Date.now(),
      });
      setShipped(isProjectShipped());
      alert('Submission saved successfully!');
    }
  };

  const toggleStep = (step: number) => {
    const newStatus = !stepStatus[`step_${step}`];
    saveStepCompletion(step, newStatus);
    setStepStatus({ ...stepStatus, [`step_${step}`]: newStatus });
    setShipped(isProjectShipped());
  };

  const toggleChecklist = () => {
    const newStatus = !checklistPassed;
    setChecklistStatus(newStatus);
    setChecklistPassedState(newStatus);
    setShipped(isProjectShipped());
  };

  const copySubmission = () => {
    const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${lovableLink}
GitHub Repository: ${githubLink}
Live Deployment: ${deployedLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
    
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const allStepsComplete = getAllStepsCompleted();
  const allLinksProvided = lovableLink && githubLink && deployedLink;
  const canShip = allStepsComplete && checklistPassed && allLinksProvided;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Project 3 — Proof of Work</h1>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              shipped ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {shipped ? 'Shipped' : 'In Progress'}
            </div>
          </div>
          <p className="text-gray-600">AI Resume Builder — Build Track</p>
        </div>

        {/* Shipped Confirmation */}
        {shipped && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <p className="text-lg font-semibold text-green-900">Project 3 Shipped Successfully.</p>
            </div>
          </div>
        )}

        {/* Step Completion Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Step Completion Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {steps.map(step => (
              <button
                key={step.num}
                onClick={() => toggleStep(step.num)}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left"
              >
                {stepStatus[`step_${step.num}`] ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">Step {step.num}</p>
                  <p className="text-sm text-gray-600">{step.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Checklist Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quality Checklist</h2>
          <button
            onClick={toggleChecklist}
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
          >
            {checklistPassed ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-2">All 10 Tests Passed</p>
              <div className="grid grid-cols-2 gap-2">
                {checklistItems.map((item, i) => (
                  <p key={i} className="text-xs text-gray-600">• {item}</p>
                ))}
              </div>
            </div>
          </button>
        </div>

        {/* Artifact Collection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Artifact Collection</h2>
          <p className="text-sm text-gray-600 mb-6">Required to mark project as Shipped</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lovable Project Link *
              </label>
              <input
                type="url"
                value={lovableLink}
                onChange={e => setLovableLink(e.target.value)}
                placeholder="https://lovable.dev/projects/..."
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lovable ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lovable && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lovable}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository Link *
              </label>
              <input
                type="url"
                value={githubLink}
                onChange={e => setGithubLink(e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.github ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.github && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.github}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deployed URL *
              </label>
              <input
                type="url"
                value={deployedLink}
                onChange={e => setDeployedLink(e.target.value)}
                placeholder="https://your-app.vercel.app"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.deployed ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.deployed && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.deployed}
                </p>
              )}
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save Submission
            </button>
          </div>
        </div>

        {/* Final Submission Export */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Final Submission</h2>
          
          {!canShip && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-900 font-medium mb-2">Requirements not met:</p>
              <ul className="text-sm text-amber-800 space-y-1">
                {!allStepsComplete && <li>• Complete all 8 steps</li>}
                {!checklistPassed && <li>• Pass all 10 checklist tests</li>}
                {!allLinksProvided && <li>• Provide all 3 proof links</li>}
              </ul>
            </div>
          )}

          <button
            onClick={copySubmission}
            disabled={!canShip}
            className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              canShip
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Copy className="w-4 h-4" />
            {copySuccess ? 'Copied!' : 'Copy Final Submission'}
          </button>
        </div>
      </div>
    </div>
  );
}
