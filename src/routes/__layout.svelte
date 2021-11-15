<script>
    import { page } from '$app/stores';
    import Navbar from '$lib/layout/Navbar.svelte';
</script>


{#if $page.path !== '/' && $page.path !== '/quiz/game' && $page.path !== '/expression/game'}
    <slot />
    <Navbar />
{:else}
    <slot />
{/if}  

