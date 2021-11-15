<script>
    import { fly } from 'svelte/transition'
</script>

<div in:fly="{{ x: -50, duration: 250, delay: 250 }}" out:fly="{{ x: -50, duration: 250 }}">
    <slot />
</div>