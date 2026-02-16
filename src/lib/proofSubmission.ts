export interface ProofSubmission {
  lovableLink: string;
  githubLink: string;
  deployedLink: string;
  timestamp: number;
}

export interface StepCompletion {
  [key: string]: boolean;
}

export function saveProofSubmission(data: ProofSubmission) {
  localStorage.setItem('rb_final_submission', JSON.stringify(data));
}

export function getProofSubmission(): ProofSubmission | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('rb_final_submission');
  return stored ? JSON.parse(stored) : null;
}

export function saveStepCompletion(step: number, completed: boolean) {
  const steps = getStepCompletions();
  steps[`step_${step}`] = completed;
  localStorage.setItem('rb_step_completions', JSON.stringify(steps));
}

export function getStepCompletions(): StepCompletion {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem('rb_step_completions');
  return stored ? JSON.parse(stored) : {};
}

export function getAllStepsCompleted(): boolean {
  const steps = getStepCompletions();
  for (let i = 1; i <= 8; i++) {
    if (!steps[`step_${i}`]) return false;
  }
  return true;
}

export function getChecklistStatus(): boolean {
  // Check if all 10 tests passed (stored separately)
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('rb_checklist_passed');
  return stored === 'true';
}

export function setChecklistStatus(passed: boolean) {
  localStorage.setItem('rb_checklist_passed', passed.toString());
}

export function isProjectShipped(): boolean {
  const allStepsComplete = getAllStepsCompleted();
  const checklistPassed = getChecklistStatus();
  const submission = getProofSubmission();
  
  return allStepsComplete && 
         checklistPassed && 
         !!submission?.lovableLink && 
         !!submission?.githubLink && 
         !!submission?.deployedLink;
}

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}
