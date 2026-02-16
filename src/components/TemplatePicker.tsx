'use client';

import { Check } from 'lucide-react';

interface TemplatePickerProps {
  selected: string;
  onChange: (template: string) => void;
}

const templates = [
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column' },
  { id: 'modern', name: 'Modern', desc: 'Two-column with sidebar' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean and spacious' },
];

export default function TemplatePicker({ selected, onChange }: TemplatePickerProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Template</h3>
      <div className="flex gap-3">
        {templates.map(tmpl => (
          <button
            key={tmpl.id}
            onClick={() => onChange(tmpl.id)}
            className={`relative w-[120px] h-[140px] border-2 rounded-lg p-2 hover:border-blue-400 transition-colors ${
              selected === tmpl.id ? 'border-blue-600' : 'border-gray-300'
            }`}
          >
            {selected === tmpl.id && (
              <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </div>
            )}
            <div className="h-full bg-gray-100 rounded flex items-center justify-center">
              {tmpl.id === 'classic' && (
                <div className="w-full h-full p-2 space-y-1">
                  <div className="h-2 bg-gray-800 w-3/4 mx-auto"></div>
                  <div className="h-px bg-gray-400 w-full"></div>
                  <div className="h-1 bg-gray-600 w-full"></div>
                  <div className="h-1 bg-gray-400 w-5/6"></div>
                  <div className="h-px bg-gray-400 w-full mt-2"></div>
                  <div className="h-1 bg-gray-600 w-full"></div>
                </div>
              )}
              {tmpl.id === 'modern' && (
                <div className="w-full h-full flex">
                  <div className="w-1/3 bg-gray-700 p-1 space-y-1">
                    <div className="h-1 bg-gray-300 w-full"></div>
                    <div className="h-1 bg-gray-300 w-3/4"></div>
                  </div>
                  <div className="flex-1 p-1 space-y-1">
                    <div className="h-1 bg-gray-600 w-full"></div>
                    <div className="h-1 bg-gray-400 w-5/6"></div>
                  </div>
                </div>
              )}
              {tmpl.id === 'minimal' && (
                <div className="w-full h-full p-3 space-y-2">
                  <div className="h-2 bg-gray-800 w-2/3"></div>
                  <div className="h-1 bg-gray-400 w-full"></div>
                  <div className="h-1 bg-gray-400 w-4/5"></div>
                  <div className="h-1 bg-gray-400 w-full mt-3"></div>
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-gray-900 mt-1">{tmpl.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
