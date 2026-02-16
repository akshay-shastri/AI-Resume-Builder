const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'delivered',
  'achieved', 'increased', 'reduced', 'established', 'coordinated',
  'executed', 'streamlined', 'enhanced', 'architected', 'deployed'
];

export function checkBulletGuidance(text: string): string[] {
  const suggestions: string[] = [];
  
  if (!text.trim()) return suggestions;

  const firstWord = text.trim().split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '');
  if (!ACTION_VERBS.includes(firstWord)) {
    suggestions.push('Start with a strong action verb.');
  }

  if (!/\d+[%kKmM]?|\d+\+|[0-9]/.test(text)) {
    suggestions.push('Add measurable impact (numbers).');
  }

  return suggestions;
}
