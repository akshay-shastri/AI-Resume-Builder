import { ResumeData } from '@/contexts/ResumeContext';

export interface ATSResult {
  score: number;
  suggestions: string[];
  improvements: string[];
}

export function calculateATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];
  const improvements: string[] = [];

  // Summary: 40-120 words (+15)
  const wordCount = data.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
  if (wordCount >= 40 && wordCount <= 120) {
    score += 15;
  } else if (wordCount < 40 && wordCount > 0) {
    suggestions.push('Write a stronger summary (40–120 words).');
    improvements.push('Expand your summary to 40-120 words for better impact.');
  } else if (wordCount === 0) {
    suggestions.push('Add a professional summary.');
    improvements.push('Add a professional summary highlighting your key strengths.');
  }

  // Projects: at least 2 (+10)
  if (data.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push('Add at least 2 projects.');
    improvements.push('Add more projects to showcase your technical abilities.');
  }

  // Experience: at least 1 (+10)
  if (data.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add work experience.');
    improvements.push('Add internship or project work experience.');
  }

  // Skills: at least 8 items (+10)
  const skillCount = (data.technicalSkills?.length || 0) + (data.softSkills?.length || 0) + (data.toolsSkills?.length || 0);
  if (skillCount >= 8) {
    score += 10;
  } else {
    suggestions.push('Add more skills (target 8+).');
    improvements.push('Expand your skills list to at least 8 items.');
  }

  // Links: GitHub or LinkedIn (+10)
  if (data.github || data.linkedin) {
    score += 10;
  } else {
    suggestions.push('Add GitHub or LinkedIn link.');
  }

  // Measurable impact: numbers in bullets (+15)
  const hasNumbers = [...data.experience, ...data.projects].some(item => {
    const text = 'description' in item ? item.description : '';
    return /\d+[%kKmM]?|\d+\+|[0-9]/.test(text);
  });
  if (hasNumbers) {
    score += 15;
  } else {
    suggestions.push('Add measurable impact (numbers) in bullets.');
    improvements.push('Add quantifiable metrics to your experience and projects.');
  }

  // Education: complete fields (+10)
  const hasCompleteEducation = data.education.some(
    edu => edu.school && edu.degree && edu.year
  );
  if (hasCompleteEducation) {
    score += 10;
  } else if (data.education.length > 0) {
    suggestions.push('Complete education fields.');
  }

  // Personal info completeness (+15)
  if (data.name && data.email && data.phone && data.location) {
    score += 15;
  } else {
    suggestions.push('Complete personal information.');
  }

  return {
    score: Math.min(score, 100),
    suggestions: suggestions.slice(0, 3),
    improvements: improvements.slice(0, 3),
  };
}
