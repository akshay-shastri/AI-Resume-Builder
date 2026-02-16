'use client';

import { ATSResult } from '@/lib/atsScore';

interface ATSScoreDisplayProps {
  result: ATSResult;
}

export default function ATSScoreDisplay({ result }: ATSScoreDisplayProps) {
  const { score, suggestions, improvements } = result;

  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getScoreTextColor = () => {
    if (score >= 80) return 'text-green-900';
    if (score >= 60) return 'text-yellow-900';
    return 'text-red-900';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">ATS Readiness Score</h3>
      
      {/* Score Display */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-4xl font-bold ${getScoreTextColor()}`}>
          {score}
        </div>
        <div className="flex-1">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColor()} transition-all duration-500`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
          <ul className="space-y-1">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-400">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top 3 Improvements */}
      {improvements.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Top 3 Improvements</p>
          <ul className="space-y-2">
            {improvements.map((improvement, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-900 font-medium">{i + 1}.</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
