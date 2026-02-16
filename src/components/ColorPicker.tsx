'use client';

import { Check } from 'lucide-react';

interface ColorPickerProps {
  selected: string;
  onChange: (color: string) => void;
}

const colors = [
  { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
  { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
  { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
  { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
  { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
];

export default function ColorPicker({ selected, onChange }: ColorPickerProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Accent Color</h3>
      <div className="flex gap-3">
        {colors.map(color => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className="relative w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selected === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
