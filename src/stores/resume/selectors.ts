// node_modules
import { derived, Readable, Writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

 // store
import type { ResumeStoreStateInterface } from "./state";

export interface ResumeStoreSelectorsInterface extends ResumeStoreStateInterface {}

export const createResumeStoreSelectors = (resumeStore: Writable<ResumeStoreStateInterface & object>): Readable<ResumeStoreSelectorsInterface> => {

  return derived(resumeStore, $resumeStore => ({
    schoolExperiences: $resumeStore.schoolExperiences,
    workExperiences: $resumeStore.workExperiences,
    certifications: $resumeStore.certifications,
    skills: $resumeStore.skills,
  }));
}