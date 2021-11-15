<script>
    import { goto } from '$app/navigation';
    import { quizScore, quizTotal } from '$lib/stores'
import Transition from '$lib/transitions/Transition.svelte';
</script>

<Transition>
<h1 class="ml-10 text-2xl text-gray-500 mt-6 font-normal">Quiz Attack!</h1>

<div class="w-4/5 h-40 border-2 border-dashed border-gray-400 rounded-3xl pl-4 text-gray-500 mx-auto mt-5">
    <img src=" draw.png" alt="drawing" class="w-40 absolute right-2 top-18 ">
    <div class="w-28 h-7 rounded-full text-center text-white text-sm bg-purple-300 pt-1 mt-4">
        Quiz Attack
    </div>
    <p class="text-xl italic text-gray-500 mt-4">Welcome to <br> Quiz Attack!</p>
</div>


<div class="w-4/5 h-44 border-2 border-gray-400 border-dashed mt-6 rounded-3xl flex flex-row mx-auto">
    <div class="w-1/2 h-full">
        <img src="idea.png" alt="" class="w-40 absolute left-4 ">
    </div>
    
    <div class="w-1/2 h-full border-l-2 border-dashed border-gray-400 pt-4 px-3 flex flex-col text-gray-600">
        <div class="w-20 h-7  rounded-full text-center text-white text-sm bg-red-300 pt-1">
            Quiz
        </div>
        <p class="pt-3 italic">Quiz Attack</p>
        <p class="pt-1 text-gray-500">Plays: {$quizTotal}</p>
        <p class="pt-1 text-gray-500">Score: {$quizScore}</p>
    </div>
</div>

<h1 class="px-9 text-lg text-gray-600 font-normal mt-4">How to play</h1>

<p class="px-9 text-md text-gray-600 mt-1">Match the expression from the image displayed with the correct option. You cna skip a question or request a clue. The clue gives you a random letter in expression.</p>

<div class="w-full flex justify-center">
    <button class="w-4/5 h-10 bg-indigo-300 rounded-full text-white  mt-3 mx-auto" on:click={ () => { goto('/quiz/game'), $quizTotal += 1  }}>Play</button>
</div>
</Transition>
