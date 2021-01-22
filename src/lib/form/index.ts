// node_modules
import { createForm as svelteFormsLibCreateForm} from 'svelte-forms-lib';

// libraries
import { _ } from '../utils';

export function createForm(createFormRequest: any) {
  const createdForm = svelteFormsLibCreateForm(createFormRequest);

  return _.assign(
    {},
    createdForm,
    {
      setForm: (formValues: any) => {
        // iterate over the keys of the form
        // and set each value of internal form
        for (const key of Object.keys(formValues)) {
          createdForm.updateField(key, formValues[key]);
        }

        // return explicitly to close function
        return;
      }
    }
  )
}