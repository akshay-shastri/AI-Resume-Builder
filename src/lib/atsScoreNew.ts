import { ResumeData } from '@/contexts/ResumeContext';

export interface ATSScoreResult {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

const ACTION_VERBS = ['built', 'led', 'designed', 'improved', 'created', 'developed', 'managed', 'implemented', 'launched', 'achieved'];

export function calculateATSScore(data: ResumeData): ATSScoreResult {
  let score = 0;
  const suggestions: string[] = [];

  // Name (+10)
  if (data.name?.trim()) {
    score += 10;
  } else {
    suggestions.push('Add your name (+10 points)');
  }

  // Email (+10)
  if (data.email?.trim()) {
    score += 10;
  } else {
    suggestions.push('Add your email (+10 points)');
  }

  // Summary > 50 chars (+10)
  if (data.summary?.length > 50) {
    score += 10;
  } else {
    suggestions.push('Add a professional summary over 50 characters (+10 points)');
  }

  // Experience with content (+15)
  if (data.experience?.length > 0 && data.experience.some(e => e.description?.trim())) {
    score += 15;
  } else {
    suggestions.push('Add at least 1 experience entry with description (+15 points)');
  }

  // Education (+10)
  if (data.education?.length > 0) {
    score += 10;
  } else {
    suggestions.push('Add at least 1 education entry (+10 points)');
  }

  // Skills (+10)
  const totalSkills = (data.technicalSkills?.length || 0) + (data.softSkills?.length || 0) + (data.toolsSkills?.length || 0);
  if (totalSkills >= 5) {
    score += 10;
  } else {
    suggestions.push(`Add at least 5 skills (currently ${totalSkills}) (+10 points)`);
  }

  // Projects (+10)
  if (data.projects?.length > 0) {
    score += 10;
  } else {
    suggestions.push('Add at least 1 project (+10 points)');
  }

  // Phone (+5)
  if (data.phone?.trim()) {
    score += 5;
  } else {
    suggestions.push('Add your phone number (+5 points)');
  }

  // LinkedIn (+5)
  if (data.linkedin?.trim()) {
    score += 5;
  } else {
    suggestions.push('Add your LinkedIn profile (+5 points)');
  }

  // GitHub (+5)
  if (data.github?.trim()) {
    score += 5;
  } else {
    suggestions.push('Add your GitHub profile (+5 points)');
  }

  // Action verbs in summary (+10)
  const summaryLower = data.summary?.toLowerCase() || '';
  if (ACTION_VERBS.some(verb => summaryLower.includes(verb))) {
    score += 10;
  } else if (data.summary?.length > 0) {
    suggestions.push('Use action verbs in summary (built, led, designed, etc.) (+10 points)');
  }

  // Determine label and color
  let label = 'Needs Work';
  let color = 'hsl(0, 70%, 50%)'; // Red
  
  if (score >= 71) {
    label = 'Strong Resume';
    color = 'hsl(142, 70%, 45%)'; // Green
  } else if (score >= 41) {
    label = 'Getting There';
    color = 'hsl(38, 90%, 50%)'; // Amber
  }

  return {
    score,
    label,
    color,
    suggestions: suggestions.slice(0, 5), // Top 5 suggestions
  };
}
