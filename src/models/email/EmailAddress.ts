// node_modules
import * as yup from 'yup';

// libraries
import { _ } from "../../lib/utils";

export interface EmailAddressInterface {
  name?: string;
  address: string;
}

export const emailAddressSchema = yup.object().shape({
  name: yup.string().label('Name').optional(),
  address: yup.string().label('Address').required(),
});

export class EmailAddress implements EmailAddressInterface {
  public name?: string;
  public address: string;

  public constructor(emailAddress: EmailAddressInterface) {
    _.assign(this, emailAddress, {
      name: _.get(emailAddress, 'name'),
      address: _.get(emailAddress, 'address'),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: EmailAddress | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: EmailAddress | undefined;
      try {
        const validateSyncResponse = emailAddressSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new EmailAddress(validateSyncResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   *
   * @returns {Promise<any>}
   * @memberof User
   */
  public async validateAsync(): Promise<{ value: EmailAddress | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: EmailAddress | undefined;
      try {
        const validateResponse = (await await emailAddressSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new EmailAddress(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
