// node_modules
import { derived, Readable, Writable } from "svelte/store";

// libraries
import { _ } from '../../lib/utils';

 // store
import type { ResumeStoreStateInterface } from "./state";

export interface ResumeStoreSelectorsInterface extends ResumeStoreStateInterface {}

export const createResumeStoreSelectors = (resumeStore: Writable<ResumeStoreStateInterface & object>): Readable<ResumeStoreSelectorsInterface> => {

  return derived(resumeStore, $resumeStore => ({
    // work experiences specific
    isSearchingWorkExperiences: $resumeStore.isSearchingWorkExperiences,
    searchWorkExperiencesError: $resumeStore.searchWorkExperiencesError,
    isPuttingWorkExperiences: $resumeStore.isPuttingWorkExperiences,
    putWorkExperiencesError: $resumeStore.putWorkExperiencesError,
    workExperiences: $resumeStore.workExperiences,

    // school experiences specific
    isSearchingSchoolExperiences: $resumeStore.isSearchingSchoolExperiences,
    searchSchoolExperiencesError: $resumeStore.searchSchoolExperiencesError,
    isPuttingSchoolExperiences: $resumeStore.isPuttingSchoolExperiences,
    putSchoolExperiencesError: $resumeStore.putSchoolExperiencesError,
    schoolExperiences: $resumeStore.schoolExperiences,

    // certifications specific
    certifications: $resumeStore.certifications,
    isSearchingCertifications: $resumeStore.isSearchingCertifications,
    searchCertificationsError: $resumeStore.searchCertificationsError,
    isPuttingCertifications: $resumeStore.isPuttingCertifications,
    putCertificationsError: $resumeStore.putCertificationsError,

    // skills specific
    skills: $resumeStore.skills,
  }));
}