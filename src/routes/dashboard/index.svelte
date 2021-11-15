<script>
    import { home, quizScore, quizTotal, expressionScore, expressionTotal } from '$lib/stores'
    import { goto } from '$app/navigation';
    import Transition from '$lib/transitions/Transition.svelte';
    
    $home = true
</script>

<Transition>
<div class="w-4/5 h-screen mx-auto">
    <div class="w-full h-16 pt-5 flex flex-row justify-between mb-3">
        <div class="w-10 h-10 rounded-full bg-gray-100">
            <img src="https://picsum.photos/200/300" alt="" class="w-full h-full object-cover rounded-full">
        </div>

        <div class="w-24 h-7 rounded-full text-center text-white text-sm bg-gray-300 pt-1 mt-2 cursor-pointer" on:click={ () => { goto('/') }}>
            Close
        </div>        
    </div>

    <div class="w-full h-40 border-2 border-dashed border-gray-400 rounded-3xl pl-4 text-gray-500">
        <img src=" drawing.png" alt="drawing" class="w-40 absolute right-4 top-18 ">
        <div class="w-28 h-7 rounded-full text-center text-white text-sm bg-blue-300 pt-1 mt-4">
            Spectrum
        </div>
        <p class="text-xl italic text-gray-500 mt-4">Welcome to <br> Spectrum!</p>
    </div>

    <div class="w-full h-44 border-2 border-gray-400 border-dashed mt-6 rounded-3xl flex flex-row">
        <div class="w-1/2 h-full">
            <img src="idea.png" alt="" class="w-40 absolute left-4 ">
        </div>
        
        <div class="w-1/2 h-full border-l-2 border-dashed border-gray-400 pt-4 px-3 flex flex-col text-gray-600">
            <div class="w-20 h-7  rounded-full text-center text-white text-sm bg-red-300 pt-1">Quiz</div>
            <p class="pt-3 italic">Quiz Attack</p>
            <p class="pt-1 text-gray-500">Plays: {$quizTotal} </p>
            <p class="pt-1 text-gray-500">Score: {$quizScore}</p>
        </div>
    </div>

    <div class="w-full h-44 border-2 border-gray-400 border-dashed mt-6 rounded-3xl flex flex-row">
        <div class="w-1/2 h-full">
            <img src="woman.png" alt="" class="w-40 absolute left-4 ">
        </div>

        <div class="w-1/2 h-full border-l-2 border-dashed border-gray-400 pt-4 px-3 flex flex-col text-gray-600">
            <div class="w-28 h-7  rounded-full text-center text-white text-sm bg-indigo-300 pt-1">
                Expressions
            </div>
            <p class="pt-3 italic">Expressions</p>
            <p class="pt-1 text-gray-500">Plays: {$expressionTotal} </p>
            <p class="pt-1 text-gray-500">Score: {$expressionScore}</p>
        </div>
    </div>

</div>
</Transition>