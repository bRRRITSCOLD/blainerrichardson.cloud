import * as _ from 'lodash';
import type { AnyObject } from '../../models/common';

declare module 'lodash' {
  interface LoDashStatic {
    replaceOne<T>(replaceCriteria: AnyObject, items: T[], replacement: T): T[];
  }
}

_.mixin({
  replaceOne: (replaceCriteria: AnyObject, items: AnyObject[], replacement: AnyObject): AnyObject[] => {
    try {
      // make a copy
      const copy = items.slice(0, items.length);
      // find index first
      const itemIndex = _.findIndex(copy, replaceCriteria);
      // if found replace and 
      // if not push on to array
      if (itemIndex > -1) {
        copy[itemIndex] = _.assign({}, replacement);
      } else {
        copy.push(_.assign({}, replacement));
      }
      // return the new array explicitly
      return copy;
    } catch (err) {
      throw err
    }
  }
});

export { _ };