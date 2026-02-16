'use client';

interface TemplateSelectorProps {
  selected: string;
  onChange: (template: string) => void;
}

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  const templates = ['classic', 'modern', 'minimal'];

  return (
    <div className="flex gap-2 mb-6">
      {templates.map(tmpl => (
        <button
          key={tmpl}
          onClick={() => onChange(tmpl)}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            selected === tmpl
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {tmpl.charAt(0).toUpperCase() + tmpl.slice(1)}
        </button>
      ))}
    </div>
  );
}
