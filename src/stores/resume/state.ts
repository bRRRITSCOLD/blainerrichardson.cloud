// node_modules
import * as faker from 'faker';
import { v4 as uuid } from 'uuid';

// libraries
import { _ } from '../../lib/utils';

// models
import type { Certification, SchoolExperience, WorkExperience } from '../../models/resume';

export interface ResumeStoreStateInterface {
  isDownloadingResume: boolean;
  downloadResumeError: any;

  isSearchingWorkExperiences: boolean;
  searchWorkExperiencesError: any;
  isPuttingWorkExperiences: boolean;
  putWorkExperiencesError: any;
  workExperiences: WorkExperience[];

  isSearchingSchoolExperiences: boolean;
  searchSchoolExperiencesError: any;
  isPuttingSchoolExperiences: boolean;
  putSchoolExperiencesError: any;
  schoolExperiences: SchoolExperience[];

  isSearchingCertifications: boolean;
  searchCertificationsError: any;
  isPuttingCertifications: boolean;
  putCertificationsError: any;
  certifications: Certification[];

  skills: string[];
}

export const initialResumeStoreState: ResumeStoreStateInterface = {
  // resume specific
  isDownloadingResume: false,
  downloadResumeError: undefined,

  // work experiences specific
  isSearchingWorkExperiences: false,
  searchWorkExperiencesError: undefined,
  isPuttingWorkExperiences: false,
  putWorkExperiencesError: undefined,
  workExperiences: [],

  // school experiences specific
  isSearchingSchoolExperiences: false,
  searchSchoolExperiencesError: undefined,
  isPuttingSchoolExperiences: false,
  putSchoolExperiencesError: undefined,
  schoolExperiences: [],

  // certifications
  isSearchingCertifications: false,
  searchCertificationsError: undefined,
  isPuttingCertifications: false,
  putCertificationsError: undefined,
  certifications: [],

  // skills specific
  skills: Array.from({ length: 10 }).map(() => faker.random.word())
};

export function cachedResumeStoreState(_resumeStoreState: ResumeStoreStateInterface): Partial<ResumeStoreStateInterface> {
  return _.assign(
    {}
  );
}
