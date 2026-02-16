'use client';

import { ATSScoreResult } from '@/lib/atsScoreNew';

interface ATSScoreCircularProps {
  result: ATSScoreResult;
}

export default function ATSScoreCircular({ result }: ATSScoreCircularProps) {
  const { score, label, color, suggestions } = result;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 no-print">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Resume Score</h3>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold" style={{ color }}>{score}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>
        
        <div>
          <p className="text-2xl font-bold mb-1" style={{ color }}>{label}</p>
          <p className="text-sm text-gray-600">
            {score < 41 && 'Add more details to improve your score'}
            {score >= 41 && score < 71 && 'You\'re on the right track!'}
            {score >= 71 && 'Your resume is ATS-optimized'}
          </p>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">Improve Your Score:</p>
          <ul className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
