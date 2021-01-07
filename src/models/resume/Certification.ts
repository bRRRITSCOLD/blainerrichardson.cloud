// node_modules
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

export interface CertificationInterface {
  certificationId: string;
  startDate: string | Date;
  endDate?: string | Date;
  name: string;
  institution: string;
}

export class Certification implements CertificationInterface {
  public certificationId: string;
  public startDate!: string | Date;
  public endDate?: string | Date;
  public name!: string;
  public institution!: string;
  

  public constructor(certification: Partial<CertificationInterface>) {
    _.assign(
      this,
      certification,
      {
        certificationId: _.get(certification, 'certificationId', uuid()),
        startDate: new Date(_.get(certification  , 'startDate', new Date)),
        endDate: _.get(certification  , 'endDate') ? new Date(_.get(certification  , 'endDate')) : undefined,
        name: _.get(certification, 'name'),
        institution: _.get(certification, 'institution'),
      }
    )
  }
}