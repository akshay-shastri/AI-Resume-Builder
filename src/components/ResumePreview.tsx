'use client';

import { ResumeData } from '@/contexts/ResumeContext';
import { ExternalLink, Github } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template?: string;
  color?: string;
}

export default function ResumePreview({ data, template = 'classic', color = 'hsl(168, 60%, 40%)' }: ResumePreviewProps) {
  
  // Modern Template - Two Column with Sidebar
  if (template === 'modern') {
    return (
      <div className="bg-white shadow-sm min-h-[1056px] max-w-[816px] mx-auto print-resume flex">
        <div className="w-1/3 p-6 print-section" style={{ backgroundColor: color }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-white">
              {data.name || 'Your Name'}
            </h1>
            <div className="text-xs space-y-1 text-white opacity-90">
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
              {data.location && <div>{data.location}</div>}
              {data.github && <div>{data.github}</div>}
              {data.linkedin && <div>{data.linkedin}</div>}
            </div>
          </div>

          {((data.technicalSkills?.length || 0) > 0 || (data.softSkills?.length || 0) > 0 || (data.toolsSkills?.length || 0) > 0) && (
            <div className="mb-6">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider text-white border-b border-white border-opacity-30 pb-1">Skills</h2>
              {(data.technicalSkills?.length || 0) > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-2 text-white opacity-80">Technical</p>
                  <div className="flex flex-wrap gap-1">
                    {data.technicalSkills.map((skill, i) => (
                      <span key={i} className="bg-white bg-opacity-20 text-white px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(data.softSkills?.length || 0) > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-2 text-white opacity-80">Soft Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {data.softSkills.map((skill, i) => (
                      <span key={i} className="bg-white bg-opacity-20 text-white px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(data.toolsSkills?.length || 0) > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold mb-2 text-white opacity-80">Tools</p>
                  <div className="flex flex-wrap gap-1">
                    {data.toolsSkills.map((skill, i) => (
                      <span key={i} className="bg-white bg-opacity-20 text-white px-2 py-0.5 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 p-8">
          {data.summary && (
            <div className="mb-6 print-section">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider pb-1" style={{ color, borderBottom: `2px solid ${color}` }}>Summary</h2>
              <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div className="mb-6 print-section">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider pb-1" style={{ color, borderBottom: `2px solid ${color}` }}>Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-3 print-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base" style={{ color }}>{exp.role}</h3>
                    <span className="text-sm text-gray-600">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium mb-1 text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-800">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.projects.length > 0 && (
            <div className="mb-6 print-section">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider pb-1" style={{ color, borderBottom: `2px solid ${color}` }}>Projects</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="mb-4 print-item">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-base" style={{ color }}>{proj.name}</h3>
                    <div className="flex gap-2">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 mb-2">{proj.description}</p>
                  {(proj.tech?.length || 0) > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `${color}20`, color }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.education.length > 0 && (
            <div className="mb-6 print-section">
              <h2 className="text-sm font-bold mb-3 uppercase tracking-wider pb-1" style={{ color, borderBottom: `2px solid ${color}` }}>Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-2 print-item">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold" style={{ color }}>{edu.school}</h3>
                    <span className="text-sm text-gray-600">{edu.year}</span>
                  </div>
                  <p className="text-sm text-gray-700">{edu.degree}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Minimal Template
  if (template === 'minimal') {
    return (
      <div className="bg-white p-16 shadow-sm min-h-[1056px] max-w-[816px] mx-auto print-resume">
        <div className="pb-8 mb-8">
          <h1 className="text-4xl font-light mb-3 tracking-wide" style={{ color }}>
            {data.name || 'Your Name'}
          </h1>
          <div className="text-sm space-x-3 text-gray-700">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>•</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>•</span>}
            {data.location && <span>{data.location}</span>}
          </div>
          {(data.github || data.linkedin) && (
            <div className="text-sm space-x-3 text-gray-700 mt-1">
              {data.github && <span>{data.github}</span>}
              {data.linkedin && <span>•</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
            </div>
          )}
        </div>

        {data.summary && (
          <div className="mb-8 print-section">
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color }}>Summary</h2>
            <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-8 print-section">
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color }}>Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-4 print-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold" style={{ color }}>{exp.role}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <p className="text-sm italic mb-1 text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-800">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="mb-8 print-section">
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color }}>Projects</h2>
            {data.projects.map(proj => (
              <div key={proj.id} className="mb-4 print-item">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold" style={{ color }}>{proj.name}</h3>
                  <div className="flex gap-2">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-800 mb-2">{proj.description}</p>
                {(proj.tech?.length || 0) > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((tech, i) => (
                      <span key={i} className="text-xs text-gray-600">{tech}{i < proj.tech.length - 1 ? ' •' : ''}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-8 print-section">
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color }}>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-2 print-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold" style={{ color }}>{edu.school}</h3>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>
        )}

        {((data.technicalSkills?.length || 0) > 0 || (data.softSkills?.length || 0) > 0 || (data.toolsSkills?.length || 0) > 0) && (
          <div className="mb-8 print-section">
            <h2 className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color }}>Skills</h2>
            {(data.technicalSkills?.length || 0) > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Technical Skills</p>
                <p className="text-sm text-gray-800">{data.technicalSkills.join(' • ')}</p>
              </div>
            )}
            {(data.softSkills?.length || 0) > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Soft Skills</p>
                <p className="text-sm text-gray-800">{data.softSkills.join(' • ')}</p>
              </div>
            )}
            {(data.toolsSkills?.length || 0) > 0 && (
              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Tools & Technologies</p>
                <p className="text-sm text-gray-800">{data.toolsSkills.join(' • ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Classic Template (Default)
  return (
    <div className="bg-white p-12 shadow-sm min-h-[1056px] max-w-[816px] mx-auto print-resume">
      <div className="pb-4 mb-6 print-section" style={{ borderBottom: `1px solid ${color}` }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color }}>
          {data.name || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-700 space-x-3">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {(data.github || data.linkedin) && (
          <div className="text-sm text-gray-700 mt-1 space-x-3">
            {data.github && <span>{data.github}</span>}
            {data.linkedin && <span>•</span>}
            {data.linkedin && <span>{data.linkedin}</span>}
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-6 print-section">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide pb-1" style={{ color, borderBottom: `1px solid ${color}` }}>Summary</h2>
          <p className="text-sm text-gray-800 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6 print-section">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide pb-1" style={{ color, borderBottom: `1px solid ${color}` }}>Experience</h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3 print-item">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold" style={{ color }}>{exp.role}</h3>
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </div>
              <p className="text-sm text-gray-700 italic mb-1">{exp.company}</p>
              <p className="text-sm text-gray-800">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6 print-section">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide pb-1" style={{ color, borderBottom: `1px solid ${color}` }}>Projects</h2>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-4 print-item border border-gray-200 rounded p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold" style={{ color }}>{proj.name}</h3>
                <div className="flex gap-2">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-2">{proj.description}</p>
              {(proj.tech?.length || 0) > 0 && (
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6 print-section">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide pb-1" style={{ color, borderBottom: `1px solid ${color}` }}>Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-2 print-item">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold" style={{ color }}>{edu.school}</h3>
                <span className="text-sm text-gray-600">{edu.year}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </div>
      )}

      {((data.technicalSkills?.length || 0) > 0 || (data.softSkills?.length || 0) > 0 || (data.toolsSkills?.length || 0) > 0) && (
        <div className="mb-6 print-section">
          <h2 className="text-lg font-bold mb-2 uppercase tracking-wide pb-1" style={{ color, borderBottom: `1px solid ${color}` }}>Skills</h2>
          {(data.technicalSkills?.length || 0) > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">Technical Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.technicalSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(data.softSkills?.length || 0) > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {data.softSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(data.toolsSkills?.length || 0) > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">Tools & Technologies</p>
              <div className="flex flex-wrap gap-2">
                {data.toolsSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: `${color}20`, color }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
