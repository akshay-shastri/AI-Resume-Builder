'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import ResumePreview from '@/components/ResumePreview';
import TemplatePicker from '@/components/TemplatePicker';
import ColorPicker from '@/components/ColorPicker';
import ATSScoreCircular from '@/components/ATSScoreCircular';
import { useResume } from '@/contexts/ResumeContext';
import { calculateATSScore } from '@/lib/atsScoreNew';
import { generatePlainText, copyToClipboard } from '@/lib/exportUtils';
import { validateForExport } from '@/lib/validation';
import { Printer, FileText } from 'lucide-react';

export default function PreviewPage() {
  const { data, template, setTemplate, color, setColor } = useResume();
  const atsResult = useMemo(() => calculateATSScore(data), [data]);
  const [showWarning, setShowWarning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePrint = () => {
    const validation = validateForExport(data);
    if (validation.hasWarnings) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.print();
  };

  const handleCopyText = async () => {
    const validation = validateForExport(data);
    if (validation.hasWarnings) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    }
    const plainText = generatePlainText(data);
    await copyToClipboard(plainText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12 no-print">
        <div className="max-w-4xl mx-auto px-6">
          <ATSScoreCircular result={atsResult} />
          <TemplatePicker selected={template} onChange={setTemplate} />
          <ColorPicker selected={color} onChange={setColor} />
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
              </button>
              <button
                onClick={handleCopyText}
                className="flex items-center gap-2 bg-white text-gray-900 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
              >
                <FileText className="w-4 h-4" />
                {copySuccess ? 'Copied!' : 'Copy Resume as Text'}
              </button>
            </div>
          </div>
          {showWarning && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded mb-6">
              Your resume may look incomplete.
            </div>
          )}
          {showToast && (
            <div className="bg-green-50 border border-green-200 text-green-900 px-4 py-3 rounded mb-6">
              PDF export ready! Check your downloads.
            </div>
          )}
        </div>
      </div>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ResumePreview data={data} template={template} color={color} />
        </div>
      </div>
    </div>
  );
}
