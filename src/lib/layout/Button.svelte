<script>
    import { goto } from '$app/navigation';
    export let text = "Let's Go"
    export let link = '/'
    export let colour = 'purple'
    export let bottom = 24
    export let left = 8
    export let pos = 'absolute'
</script>

<button class="w-32 h-12 bg-{colour}-300 rounded-full text-white {pos} bottom-{bottom} left-{left} " on:click={ () => { goto(`${link}`) }}>{text} <i class="fas fa-arrow-right"></i></button>