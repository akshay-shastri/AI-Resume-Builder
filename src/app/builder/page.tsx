'use client';

import { useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import ResumePreview from '@/components/ResumePreview';
import ATSScoreDisplay from '@/components/ATSScoreDisplay';
import TemplateSelector from '@/components/TemplateSelector';
import TagInput from '@/components/TagInput';
import { useResume } from '@/contexts/ResumeContext';
import { calculateATSScore } from '@/lib/atsScore';
import { checkBulletGuidance } from '@/lib/bulletGuidance';
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles, ExternalLink, Github } from 'lucide-react';

export default function BuilderPage() {
  const { data, updateField, loadSample, template, setTemplate, color } = useResume();
  const atsResult = useMemo(() => calculateATSScore(data), [data]);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [suggestingSkills, setSuggestingSkills] = useState(false);

  const addEducation = () => {
    updateField('education', [...data.education, { id: Date.now().toString(), school: '', degree: '', year: '' }]);
  };

  const removeEducation = (id: string) => {
    updateField('education', data.education.filter(e => e.id !== id));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateField('education', data.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addExperience = () => {
    updateField('experience', [...data.experience, { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }]);
  };

  const removeExperience = (id: string) => {
    updateField('experience', data.experience.filter(e => e.id !== id));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    updateField('experience', data.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addProject = () => {
    updateField('projects', [...data.projects, { id: Date.now().toString(), name: '', description: '', tech: [], liveUrl: '', githubUrl: '' }]);
  };

  const removeProject = (id: string) => {
    updateField('projects', data.projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: string, value: any) => {
    updateField('projects', data.projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const toggleProject = (id: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedProjects(newExpanded);
  };

  const suggestSkills = async () => {
    setSuggestingSkills(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateField('technicalSkills', [...new Set([...(data.technicalSkills || []), 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'])]);
    updateField('softSkills', [...new Set([...(data.softSkills || []), 'Team Leadership', 'Problem Solving'])]);
    updateField('toolsSkills', [...new Set([...(data.toolsSkills || []), 'Git', 'Docker', 'AWS'])]);
    setSuggestingSkills(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex">
        {/* Left: Form */}
        <div className="w-1/2 p-8 overflow-auto h-screen">
          <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
              <button
                onClick={loadSample}
                className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
              >
                Load Sample Data
              </button>
            </div>

            {/* ATS Score */}
            <ATSScoreDisplay result={atsResult} />

            {/* Template Selector */}
            <TemplateSelector selected={template} onChange={setTemplate} />

            {/* Personal Info */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={e => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={e => updateField('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={data.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={data.location}
                  onChange={e => updateField('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </section>

            {/* Summary */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h2>
              <textarea
                placeholder="Brief summary of your experience and skills..."
                value={data.summary}
                onChange={e => updateField('summary', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </section>

            {/* Education */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Education</h2>
                <button onClick={addEducation} className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {data.education.map(edu => (
                <div key={edu.id} className="border border-gray-200 rounded p-4 mb-3">
                  <div className="flex justify-end mb-2">
                    <button onClick={() => removeEducation(edu.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="School"
                    value={edu.school}
                    onChange={e => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={e => updateEducation(edu.id, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              ))}
            </section>

            {/* Experience */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Experience</h2>
                <button onClick={addExperience} className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {data.experience.map(exp => {
                const guidance = checkBulletGuidance(exp.description);
                return (
                  <div key={exp.id} className="border border-gray-200 rounded p-4 mb-3">
                    <div className="flex justify-end mb-2">
                      <button onClick={() => removeExperience(exp.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={e => updateExperience(exp.id, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2021-2023)"
                      value={exp.duration}
                      onChange={e => updateExperience(exp.id, 'duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    {guidance.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {guidance.map((hint, i) => (
                          <p key={i} className="text-xs text-amber-700 italic">{hint}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Projects */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                <button onClick={addProject} className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {data.projects.map(proj => {
                const isExpanded = expandedProjects.has(proj.id);
                return (
                  <div key={proj.id} className="border border-gray-200 rounded mb-3">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleProject(proj.id)}
                    >
                      <h3 className="font-medium text-gray-900">{proj.name || 'Untitled Project'}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProject(proj.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="p-4 border-t border-gray-200 space-y-3">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={proj.name}
                          onChange={e => updateProject(proj.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                        <div>
                          <textarea
                            placeholder="Description"
                            value={proj.description}
                            onChange={e => updateProject(proj.id, 'description', e.target.value.slice(0, 200))}
                            rows={3}
                            maxLength={200}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">{proj.description?.length || 0}/200</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                          <TagInput
                            tags={proj.tech || []}
                            onChange={tags => updateProject(proj.id, 'tech', tags)}
                            placeholder="Type and press Enter"
                          />
                        </div>
                        <input
                          type="url"
                          placeholder="Live URL (optional)"
                          value={proj.liveUrl || ''}
                          onChange={e => updateProject(proj.id, 'liveUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                        <input
                          type="url"
                          placeholder="GitHub URL (optional)"
                          value={proj.githubUrl || ''}
                          onChange={e => updateProject(proj.id, 'githubUrl', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </section>

            {/* Skills */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
                <button
                  onClick={suggestSkills}
                  disabled={suggestingSkills}
                  className="flex items-center gap-1 text-sm bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-800 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  {suggestingSkills ? 'Loading...' : '✨ Suggest Skills'}
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Skills ({data.technicalSkills?.length || 0})
                  </label>
                  <TagInput
                    tags={data.technicalSkills || []}
                    onChange={tags => updateField('technicalSkills', tags)}
                    placeholder="Type skill and press Enter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soft Skills ({data.softSkills?.length || 0})
                  </label>
                  <TagInput
                    tags={data.softSkills || []}
                    onChange={tags => updateField('softSkills', tags)}
                    placeholder="Type skill and press Enter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tools & Technologies ({data.toolsSkills?.length || 0})
                  </label>
                  <TagInput
                    tags={data.toolsSkills || []}
                    onChange={tags => updateField('toolsSkills', tags)}
                    placeholder="Type tool and press Enter"
                  />
                </div>
              </div>
            </section>

            {/* Links */}
            <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Links</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="GitHub"
                  value={data.github}
                  onChange={e => updateField('github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={data.linkedin}
                  onChange={e => updateField('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </section>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-1/2 bg-gray-100 p-8 overflow-auto h-screen sticky top-0">
          <ResumePreview data={data} template={template} color={color} />
        </div>
      </div>
    </div>
  );
}
