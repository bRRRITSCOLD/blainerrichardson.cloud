// node_modules
import * as _ from 'lodash';

export interface WorkExperienceInterface {
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
}

export class WorkExperience implements WorkExperienceInterface {
  public startDate!: string | Date;
  public endDate?: string | Date;
  public companyName!: string;
  public companyAddress!: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  public position: string;

  public constructor(workExperience: Partial<WorkExperienceInterface>) {
    _.assign(
      this,
      workExperience,
      {
        startDate: new Date(_.get(workExperience  , 'startDate', new Date)),
        endDate: _.get(workExperience  , 'endDate') ? new Date(_.get(workExperience  , 'endDate')) : undefined,
        companyName: _.get(workExperience, 'companyName'),
        companyAddress: _.get(workExperience, 'companyAddress')
      }
    )
  }
}