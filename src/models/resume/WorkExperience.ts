// node_modules
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

export interface WorkExperienceInterface {
  workExperienceId: string;
  startDate: string | Date;
  endDate?: string | Date;
  companyName: string;
  companyAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  position: string;
  duties: string[];
  accomplishments: string[];
}

export class WorkExperience implements WorkExperienceInterface {
  public workExperienceId: string;
  public startDate: string | Date;
  public endDate?: string | Date;
  public companyName: string;
  public companyAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public position: string;
  public duties: string[];
  public accomplishments: string[];

  public constructor(workExperience: Partial<WorkExperienceInterface>) {
    _.assign(
      this,
      workExperience,
      {
        workExperienceId: _.get(workExperience, 'workExperienceId', uuid()),
        startDate: new Date(_.get(workExperience  , 'startDate', new Date())),
        endDate: _.get(workExperience  , 'endDate') ? new Date(_.get(workExperience  , 'endDate')) : 'Present',
        companyName: _.get(workExperience, 'companyName'),
        companyAddress: _.get(workExperience, 'companyAddress'),
        position: _.get(workExperience, 'position'),
        duties: _.get(workExperience, 'duties', []),
        accomplishments: _.get(workExperience, 'accomplishments', [])
      }
    )
  }
}