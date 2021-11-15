<script>
    import { goto } from '$app/navigation';
    import { expressionScore, expressionTotal } from '$lib/stores'
import Transition from '$lib/transitions/Transition.svelte';
</script>

<Transition>
<h1 class="ml-10 text-2xl text-gray-500 mt-6 font-normal">Expressions!</h1>

<div class="w-4/5 h-40 border-2 border-dashed border-gray-400 rounded-3xl pl-4 text-gray-500 mx-auto mt-5">
    <img src=" drawings.png" alt="drawing" class="w-40 absolute right-2 top-18 ">
    <div class="w-28 h-7 rounded-full text-center text-white text-sm bg-purple-300 pt-1 mt-4">
        Expressions
    </div>
    <p class="text-xl italic text-gray-500 mt-4">Welcome to <br> Expressions!</p>
</div>


<div class="w-4/5 h-44 border-2 border-gray-400 border-dashed mt-6 rounded-3xl flex flex-row mx-auto">
    <div class="w-1/2 h-full">
        <img src="woman.png" alt="" class="w-40 absolute left-4 ">
    </div>
    
    <div class="w-1/2 h-full border-l-2 border-dashed border-gray-400 pt-4 px-3 flex flex-col text-gray-600">
        <div class="w-28 h-7  rounded-full text-center text-white text-sm bg-indigo-300 pt-1">
            Expression
        </div>
        <p class="pt-3 italic">Expressions</p>
        <p class="pt-1 text-gray-500">Plays: {$expressionTotal}</p>
        <p class="pt-1 text-gray-500">Score: {$expressionScore}</p>
    </div>
</div>

<h1 class="px-9 text-lg text-gray-600 font-normal mt-4">How to play</h1>

<p class="px-9 text-md text-gray-600 mt-1">Express the emotion in the prompt at the bottom of the page. Click on the detect button when you're ready.Wait for count down to reach 0 before doing expression.</p>

<div class="w-full flex justify-center">
    <button class="w-4/5 h-10 bg-red-300 rounded-full text-white mt-3 mx-auto" on:click={ () => { goto('/expression/game') ,$expressionTotal += 1 }}>Play</button>
</div>
</Transition>