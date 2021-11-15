<script>
    import Button from "$lib/layout/Button.svelte";
    import Transition from "$lib/transitions/Transition.svelte";
</script>

<Transition>
    <div class="w-full h-screen flex flex-col text-center">
        <img src="creativity.png" alt="" class="w-60 h-60  mx-auto mt-32">
        <h1 class="text-3xl text-red-300 font-normal">Spectrum</h1>
        <p class="text-xl text-red-300 mt-1 italic">play, learn & express</p>
        
    </div>
    
    <Button link='/dashboard' colour='indigo'/>
</Transition>

