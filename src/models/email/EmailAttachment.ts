// node_modules
import * as yup from 'yup';

// libraries
import { _ } from "../../lib/utils";

export interface EmailAttachmentInterface {
  filename: string;
  content?: string;
  path?: string;
  contentType?: string;
  encoding?: string;
}

export const emailAttachmentSchema = yup.object().shape({
  filename: yup.string().label('Filename').optional(),
  content: yup
    .mixed()
    .label('Content (Buffer)')
    .test('bufferOrString', 'Provide a Buffer or a String.', (value: any) => {
      return /* optional */ value === undefined || typeof value === 'string';
    }),
  path: yup.string().label('Path').optional(),
  contentType: yup.string().label('Content Type').optional(),
  encoding: yup.string().label('Encoding').optional(),
});

export class EmailAttachment implements EmailAttachmentInterface {
  public filename: string;
  public content?: string;
  public path?: string;
  public contentType?: string;
  public encoding?: string;

  public constructor(emailAttachment: EmailAttachmentInterface) {
    _.assign(this, emailAttachment, {
      filename: _.get(emailAttachment, 'filename'),
      content: _.get(emailAttachment, 'content'),
      path: _.get(emailAttachment, 'path'),
      contentType: _.get(emailAttachment, 'contentType'),
      encoding: _.get(emailAttachment, 'encoding'),
    });
  }

  /**
   *
   *
   * @returns {({ value: User | undefined; error: Error | yup.ValidationError | undefined })}
   * @memberof User
   */
  public validate(): { value: EmailAttachment | undefined; error: Error | yup.ValidationError | undefined } {
    try {
      let validationError;
      let validationValue: EmailAttachment | undefined;
      try {
        const validateSyncResponse = emailAttachmentSchema.validateSync(_.assign({}, this), { strict: true }) as any;
        validationValue = new EmailAttachment(validateSyncResponse);
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
  public async validateAsync(): Promise<{ value: EmailAttachment | undefined; error: Error | yup.ValidationError | undefined }> {
    try {
      let validationError;
      let validationValue: EmailAttachment | undefined;
      try {
        const validateResponse = (await emailAttachmentSchema.validate(_.assign({}, this), { strict: true })) as any;
        validationValue = new EmailAttachment(validateResponse);
      } catch (err) {
        validationError = err;
      }
      return { value: validationValue, error: validationError };
    } catch (err) {
      throw err;
    }
  }
}
