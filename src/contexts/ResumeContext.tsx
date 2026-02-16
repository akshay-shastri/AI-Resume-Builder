'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  technicalSkills: string[];
  softSkills: string[];
  toolsSkills: string[];
  github: string;
  linkedin: string;
}

const initialData: ResumeData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  technicalSkills: [],
  softSkills: [],
  toolsSkills: [],
  github: '',
  linkedin: '',
};

const sampleData: ResumeData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  summary: 'Full-stack developer with 5 years of experience building scalable web applications. Passionate about clean code and user experience.',
  education: [
    { id: '1', school: 'Stanford University', degree: 'BS Computer Science', year: '2019' },
  ],
  experience: [
    { id: '1', company: 'Tech Corp', role: 'Senior Developer', duration: '2021-Present', description: 'Led development of microservices architecture serving 1M+ users' },
    { id: '2', company: 'StartupXYZ', role: 'Full Stack Developer', duration: '2019-2021', description: 'Built React/Node.js applications from scratch' },
  ],
  projects: [
    { id: '1', name: 'E-commerce Platform', description: 'Built scalable shopping platform with payment integration', tech: ['React', 'Node.js', 'PostgreSQL'], liveUrl: 'https://example.com', githubUrl: 'https://github.com/example' },
  ],
  skills: 'JavaScript, TypeScript, React, Node.js, Python, AWS, Docker',
  technicalSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
  softSkills: ['Team Leadership', 'Problem Solving'],
  toolsSkills: ['Git', 'Docker', 'AWS'],
  github: 'github.com/alexjohnson',
  linkedin: 'linkedin.com/in/alexjohnson',
};

interface ResumeContextType {
  data: ResumeData;
  updateField: (field: keyof ResumeData, value: any) => void;
  loadSample: () => void;
  template: string;
  setTemplate: (template: string) => void;
  color: string;
  setColor: (color: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [template, setTemplateState] = useState('classic');
  const [color, setColorState] = useState('hsl(168, 60%, 40%)');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('resumeBuilderData');
    if (stored) {
      const parsed = JSON.parse(stored);
      setData({
        ...parsed,
        technicalSkills: parsed.technicalSkills || [],
        softSkills: parsed.softSkills || [],
        toolsSkills: parsed.toolsSkills || [],
        projects: (parsed.projects || []).map((p: any) => ({
          ...p,
          tech: Array.isArray(p.tech) ? p.tech : (p.tech ? p.tech.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          liveUrl: p.liveUrl || '',
          githubUrl: p.githubUrl || ''
        }))
      });
    }
    const storedTemplate = localStorage.getItem('resumeTemplate');
    if (storedTemplate) {
      setTemplateState(storedTemplate);
    }
    const storedColor = localStorage.getItem('resumeColor');
    if (storedColor) {
      setColorState(storedColor);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('resumeBuilderData', JSON.stringify(data));
    }
  }, [data, loaded]);

  const setTemplate = (tmpl: string) => {
    setTemplateState(tmpl);
    localStorage.setItem('resumeTemplate', tmpl);
  };

  const setColor = (clr: string) => {
    setColorState(clr);
    localStorage.setItem('resumeColor', clr);
  };

  const updateField = (field: keyof ResumeData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const loadSample = () => setData(sampleData);

  return (
    <ResumeContext.Provider value={{ data, updateField, loadSample, template, setTemplate, color, setColor }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within ResumeProvider');
  return context;
};
