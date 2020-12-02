// node_modules
import * as _ from 'lodash';

export interface SchoolExperienceInterface {
}

export class SchoolExperience implements SchoolExperienceInterface {

  public constructor(schoolExperience: Partial<SchoolExperienceInterface>) {
    _.assign(
      this,
      schoolExperience,
      {

      }
    )
  }
}