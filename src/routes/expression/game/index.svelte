<script>
    import { goto } from '$app/navigation';
import ExpressionCard from '$lib/blocks/ExpressionCard.svelte';
import FlyUp from '$lib/transitions/FlyUp.svelte';
    
</script>

<FlyUp>
    <div class="w-4/5 h-16 mx-auto pt-4 text-gray-600 flex flex-row mt-2">
        <button class="w-16 h-8 rounded-lg bg-purple-300 text-white" on:click={ () => { goto('/expression')} }>Quit</button>
    </div>

    <div class="w-full">
        <ExpressionCard />
    </div>
</FlyUp>
