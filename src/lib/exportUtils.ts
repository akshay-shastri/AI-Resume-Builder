import { ResumeData } from '@/contexts/ResumeContext';

export function generatePlainText(data: ResumeData): string {
  const lines: string[] = [];

  // Name
  if (data.name) {
    lines.push(data.name.toUpperCase());
    lines.push('');
  }

  // Contact
  const contact: string[] = [];
  if (data.email) contact.push(data.email);
  if (data.phone) contact.push(data.phone);
  if (data.location) contact.push(data.location);
  if (contact.length > 0) {
    lines.push(contact.join(' | '));
    lines.push('');
  }

  // Links
  const links: string[] = [];
  if (data.github) links.push(data.github);
  if (data.linkedin) links.push(data.linkedin);
  if (links.length > 0) {
    lines.push(links.join(' | '));
    lines.push('');
  }

  // Summary
  if (data.summary) {
    lines.push('SUMMARY');
    lines.push(data.summary);
    lines.push('');
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push('EXPERIENCE');
    data.experience.forEach(exp => {
      lines.push(`${exp.role} - ${exp.company}`);
      lines.push(exp.duration);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    });
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push('PROJECTS');
    data.projects.forEach(proj => {
      lines.push(proj.name);
      if (proj.description) lines.push(proj.description);
      if (proj.tech?.length > 0) lines.push(`Technologies: ${proj.tech.join(', ')}`);
      if (proj.liveUrl) lines.push(`Live: ${proj.liveUrl}`);
      if (proj.githubUrl) lines.push(`GitHub: ${proj.githubUrl}`);
      lines.push('');
    });
  }

  // Education
  if (data.education.length > 0) {
    lines.push('EDUCATION');
    data.education.forEach(edu => {
      lines.push(`${edu.school} - ${edu.degree} (${edu.year})`);
    });
    lines.push('');
  }

  // Skills
  const allSkills = [
    ...(data.technicalSkills || []).map(s => `Technical: ${s}`),
    ...(data.softSkills || []).map(s => `Soft: ${s}`),
    ...(data.toolsSkills || []).map(s => `Tools: ${s}`)
  ];
  if (allSkills.length > 0) {
    lines.push('SKILLS');
    lines.push(allSkills.join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
