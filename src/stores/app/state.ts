// node_modules
import { mdiLinkedin, mdiGithub, mdiEmail, mdiFileDocument } from '@mdi/js';
import * as faker from 'faker';

// libraries
import { _ } from '../../lib/utils';

// models
import { WorkExperience, SchoolExperience, Certification } from '../../models/resume';

export interface AppStoreStateInterface {
  circleText: string;
  isChangingCircleText: boolean;
  iconLinks: { name: string; path: string; href?: string; }[];
  workExperience: WorkExperience[];
  schoolExperience: SchoolExperience[];
  certifications: Certification[];
  skills: string[];
}

export const initialAppStoreState: AppStoreStateInterface = {
  circleText: '',
  isChangingCircleText: false,
  iconLinks: [
    {
      name: 'linkedin',
      path: mdiLinkedin,
      href: 'https://www.linkedin.com/in/blainerrichardson'
    },
    {
      name: 'github',
      path: mdiGithub,
      href: 'https://github.com/bRRRITSCOLD'
    },
    {
      name: 'email',
      path: mdiEmail
    },
    {
      name: 'resume',
      path: mdiFileDocument
    }
  ],
  workExperience: Array.from({ length: 10 }).map(() => new WorkExperience({
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    companyName: faker.company.companyName(),
    companyAddress: {
      addressLine1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode()
    },
    position: faker.name.jobTitle()
  })),
  schoolExperience: Array.from({ length: 10 }).map(() => new SchoolExperience({
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    schoolName: faker.company.companyName(),
    schoolAddress: {
      addressLine1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode()
    },
    degree: faker.name.jobTitle(),
    classes: Array.from({ length: _.sample([8, 9, 10, 11, 12, 13]) })
      .map(() => faker.random.word())
  })),
  certifications: Array.from({ length: 10 }).map(() => new Certification({
    startDate: faker.date.past(),
    endDate: faker.date.past(),
    name: faker.company.companyName(),
    institution: faker.company.companyName()
  })),
  skills: Array.from({ length: 10 }).map(() => faker.random.word())
};

export function hydrateAppStoreState(_appStoreState: AppStoreStateInterface): Partial<AppStoreStateInterface> {
  return _.assign(
    {}
  );
}
