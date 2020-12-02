// node_modules
import * as _ from 'lodash';

export interface CertificationInterface {
}

export class Certification implements CertificationInterface {

  public constructor(certification: Partial<CertificationInterface>) {
    _.assign(
      this,
      certification,
      {

      }
    )
  }
}