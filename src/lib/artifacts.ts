export type ArtifactType = 'screenshot' | 'link' | 'text';

export interface Artifact {
  step: number;
  type: ArtifactType;
  data: string;
  timestamp: number;
}

const STORAGE_KEY = 'rb_artifacts';

export const saveArtifact = (step: number, type: ArtifactType, data: string) => {
  const artifacts = getArtifacts();
  artifacts[`rb_step_${step}_artifact`] = { step, type, data, timestamp: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts));
};

export const getArtifact = (step: number): Artifact | null => {
  const artifacts = getArtifacts();
  return artifacts[`rb_step_${step}_artifact`] || null;
};

export const getArtifacts = (): Record<string, Artifact> => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const getAllStepStatuses = (): boolean[] => {
  const artifacts = getArtifacts();
  return Array.from({ length: 8 }, (_, i) => !!artifacts[`rb_step_${i + 1}_artifact`]);
};

export const saveProofLinks = (lovable: string, github: string, deploy: string) => {
  localStorage.setItem('rb_proof_links', JSON.stringify({ lovable, github, deploy }));
};

export const getProofLinks = () => {
  if (typeof window === 'undefined') return { lovable: '', github: '', deploy: '' };
  const stored = localStorage.getItem('rb_proof_links');
  return stored ? JSON.parse(stored) : { lovable: '', github: '', deploy: '' };
};
