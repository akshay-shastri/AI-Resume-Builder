import { ResumeData } from '@/contexts/ResumeContext';

export interface ValidationWarning {
  hasWarnings: boolean;
  message: string;
}

export function validateForExport(data: ResumeData): ValidationWarning {
  const issues: string[] = [];

  if (!data.name || data.name.trim() === '') {
    issues.push('name');
  }

  if (data.experience.length === 0 && data.projects.length === 0) {
    issues.push('experience or projects');
  }

  if (issues.length > 0) {
    return {
      hasWarnings: true,
      message: 'Your resume may look incomplete.',
    };
  }

  return {
    hasWarnings: false,
    message: '',
  };
}
