<script>
    import { goto } from '$app/navigation';
    import { quizScore, currentQuiz, endOfQuiz } from '$lib/stores'
    import FlyUp from '$lib/transitions/FlyUp.svelte';
    const expresions = ['sad', 'happy', 'angry', 'disgusted', 'surprised', 'neutral']
    const questions = [{ image: 'faces/angry.jpg', emotion: 'angry' }, { image: 'faces/disgusted.jpg', emotion: 'disgusted' }, { image: 'faces/happy.jpg', emotion: 'happy' }, { image: 'faces/neutral.jpg', emotion: 'neutral' }, { image: 'faces/sad.jpg', emotion: 'sad' }, { image: 'faces/surprised.jpg', emotion: 'surprised' }];

    $quizScore = 0 
    let correct = 0
    let clueStr = ''
    

    function checkAnswer(expression) {
       
        let nextQuestion = $currentQuiz + 1;

        if(expression === questions[$currentQuiz].emotion) {
            $quizScore =  $quizScore + 100 * ($currentQuiz * 5)
            correct += 1
        }

        if(nextQuestion < questions.length) {
            $currentQuiz += 1
            clueStr = ''
        } else {
            display = true
            $endOfQuiz = true
        }

        selected = false
    }

    function skipQuestion() {
        $currentQuiz += 1

        if($quizScore >= 100) {
            $quizScore -= 100
        } else {
            $quizScore = 0
        }
    }

    function resetQuiz() {
        $currentQuiz = 0
        display = false
        correct = 0
    }

    let selected = false;

    let display = false;


</script>

<FlyUp>
    <div class="alert w-4/5 h-48 bg-white border-2 border-dashed border-gray-400 absolute rounded-2xl  top-0 left-0 bottom-0 right-0 mt-48 mx-auto hidden" class:display >
        <div class="w-full h-3/4 border-b-2 border-dashed border-gray-400 text-center text-lg text-gray-500 p-5 font-normal">
            {#if correct > (expresions.length / 2)}
                <p>Well done! You scored {correct}/6!</p>
            {:else}
                <p>Good try! Let's try beat {correct}/6 next time.</p>
            {/if}
            <p class="text-indigo-300">Your score is {$quizScore}pts</p>
        </div>
        <div class="w-full h-1/4 flex justify-around pt-2">
            <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-blue-300" on:click={() => { goto('/quiz'), resetQuiz()}}>Finish</button>
            <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-purple-300" on:click={() => { resetQuiz(), $quizScore = 0 }}>Retry</button>
        </div>
    
    </div>

    <div class="w-4/5 h-16 mx-auto pt-4 text-gray-600 flex flex-row mt-2">
        <button class="w-16 h-8 rounded-lg bg-red-300 text-white" on:click={ () => { goto('/quiz'), $currentQuiz = 0 } }>Quit</button>
    </div>

    <div class="w-4/5 h-72 border-2 border-dashed border-gray-400 rounded-2xl mx-auto mt-1">
        <div class="w-full h-2/3 border-b-2 border-dashed border-gray-400 text-center">
            <p class="text-lg mt-1 text-gray-600">{$currentQuiz + 1 < 6 ? $currentQuiz + 1 : 6 }/6</p>
            <div class="w-36 h-36 mx-auto ">
                <img src="../../../static/{questions[$currentQuiz].image}" alt="" class="w-36 h-36  object-cover rounded-xl">
            </div>
        </div>
        
        <div class="w-full h-1/3 rounded-b-2xl text-center  pt-1">
            <p class="mx-auto text-gray-600">What expression is this?</p>
            <div class="w-full h-6 text-center">
                <p class="clue__output text-indigo-300 text-sm"> {clueStr} </p>
            </div>
            <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-indigo-300  mt-1/2 mr-10" on:click={ () => { clueStr = '  ' + questions[$currentQuiz].emotion[Math.floor(Math.random() * 3)]  } }>Clue</button>
            <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-gray-300  mt-1/2" on:click={() => { skipQuestion() }}>Skip</button>
        </div>
    </div>

    <div class="w-4/5 h-80 mx-auto mt-3">
        {#each expresions as expression}
            <button class="w-full h-12 rounded-xl border-2 border-dashed border-gray-400 mt-3 text-gray-600 transition-all" class:selected on:click={() => { checkAnswer(expression) }}>{expression}</button>
        {/each}
    </div>
</FlyUp>

<style>
    .display {
        display: block;
    }

    .selected {
        background-color:  rgba(165,180,252, 300);
    }
</style>