// node_modules
import type { RouteDefinition } from 'svelte-spa-router';

// Components
import Index from './pages/Index.svelte'
import Admin from './pages/Admin.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Index,
    '/admin': Admin,
} as RouteDefinition