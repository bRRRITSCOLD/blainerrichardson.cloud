// node_modules
import type { RouteDefinition } from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';
import { userStore } from './stores/user';

export const routeNames = {
  // all: '*',
  home: '/home',
  admin: '/admin'
}

// Export the route definition object
export const routes = {
    [routeNames.admin]: wrap({
      asyncComponent: () => import('./pages/Admin.svelte'),
      // List of route pre-conditions
      conditions: [
        // First pre-condition function
        (detail) => {
            let isAuthenticated;
            console.log('isAuthenticated', isAuthenticated);
            const unsubscribe = userStore.subscribe((item) => isAuthenticated = item.isAuthenticated)
            unsubscribe();
            console.log('isAuthenticated', isAuthenticated);
            // check to see if a user is logged in
            return isAuthenticated;
        },
        // // Second pre-condition function
        // (detail) => {
        //     // This pre-condition is executed only if the first one succeeded
        //     console.log('Pre-condition 2 executed', detail.location, detail.querystring)
        //     // Always succeed
        //     return true
        // }
      ]
    }),
    [routeNames.home]: wrap({
      asyncComponent: () => import('./pages/Index.svelte'),
    }),
    // [routeNames.all]: wrap({
    //   asyncComponent: () => import('./pages/Index.svelte'),
    // }),
} as RouteDefinition