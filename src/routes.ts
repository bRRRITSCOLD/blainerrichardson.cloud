// Components
import type { RouteDefinition } from 'svelte-spa-router'
import Index from './pages/Index.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': Index,
    '/admin': Index,
} as RouteDefinition