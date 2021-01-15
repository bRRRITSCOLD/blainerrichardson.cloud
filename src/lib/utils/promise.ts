// node_modules
import * as _ from 'lodash';

export const promiseUtils = {
  allSettled: async <T>(promises: Promise<T>[]): Promise<{ status: 'fulfilled' | 'rejected', data?: T, reason?: any }[]> => {
    return Promise.all(promises.map(async (promise) => {
      try {
        return {
          status: 'fulfilled' as 'fulfilled' | 'rejected',
          data: await promise,
        }
      } catch (err) {
        return {
          status: 'rejected' as 'fulfilled' | 'rejected',
          reason: err
        }
      }
    }));
  },
  async concurrentLimit(items: any[], limit: number, asyncFunc: (item: any) => Promise<any>): Promise<any[]> {
    try {
      const batches = _.chunk(items, limit);

      const results = [];

      for (const batch of batches) {
        const asyncTasks = [];

        for (const item of batch) {
          asyncTasks.push(asyncFunc(item));
        }

        results.push(...(await Promise.all(asyncTasks)));
      }

      return results;
    } catch (err) {
      throw err;
    }
  },
};
