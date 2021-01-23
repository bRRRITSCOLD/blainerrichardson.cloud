// node_modules
import * as faker from 'faker';
import { v4 as uuid } from 'uuid';

// libraries
import { _ } from '../../lib/utils';

// models
import { Certification, SchoolExperience, WorkExperience } from '../../models/resume';

export interface ResumeStoreStateInterface {
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
  certifications: Certification[];
  skills: string[];
}

export const initialResumeStoreState: ResumeStoreStateInterface = {
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
  // workExperiences: Array.from({ length: 10 }).map(() => new WorkExperience({
  //   workExperienceId: uuid(),
  //   startDate: faker.date.past(),
  //   endDate: faker.date.past(),
  //   companyName: faker.company.companyName(),
  //   companyAddress: {
  //     addressLine1: faker.address.streetAddress(),
  //     city: faker.address.city(),
  //     state: faker.address.state(),
  //     zipCode: faker.address.zipCode()
  //   },
  //   position: faker.name.jobTitle(),
  //   duties: Array.from({ length: _.sample([4, 5, 6]) })
  //     .map(() => faker.lorem.paragraph(_.sample([1, 2, 3, 4]))),
  //   accomplishments: Array.from({ length: _.sample([4, 5, 6]) })
  //     .map(() => faker.lorem.paragraph(_.sample([1, 2, 3, 4])))
  // })),
  // schoolExperiences: Array.from({ length: 10 }).map(() => new SchoolExperience({
  //   schoolExperienceId: uuid(),
  //   startDate: faker.date.past(),
  //   endDate: faker.date.past(),
  //   schoolName: faker.company.companyName(),
  //   schoolAddress: {
  //     addressLine1: faker.address.streetAddress(),
  //     city: faker.address.city(),
  //     state: faker.address.state(),
  //     zipCode: faker.address.zipCode()
  //   },
  //   degree: faker.name.jobTitle(),
  //   classes: Array.from({ length: _.sample([8, 9, 10, 11, 12, 13]) })
  //     .map(() => faker.random.word())
  // })),

  // certifications specific
  certifications: Array.from({ length: 10 }).map(() => new Certification({
    certificationId: uuid(),
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    name: faker.company.companyName(),
    institution: faker.company.companyName()
  })),

  // skills specific
  skills: Array.from({ length: 10 }).map(() => faker.random.word())
};

export function cachedResumeStoreState(_resumeStoreState: ResumeStoreStateInterface): Partial<ResumeStoreStateInterface> {
  return _.assign(
    {}
  );
}
