<script>
    import { home, expression, quiz } from '$lib/stores'
</script>

<div class="w-4/5 h-16 flex justify-around pt-5 rounded-full absolute bottom-4 border-2 border-dashed border-gray-400 left-0 right-0 mx-auto ">
    <a href="/dashboard" class="text-gray-400" class:active={$home} on:click={ () => { $home = true, $expression = false, $quiz = false }}><i class="fas fa-couch fa-xl  transition-all"></i></a>
    <a href="/expression" class="text-gray-400" class:active={$expression} on:click={() => { $home = false, $expression = true, $quiz = false }}><i class="fas fa-grin-stars fa-xl  transition-all"></i></a>
    <a href="/quiz" class="text-gray-400" class:active={$quiz} on:click={ () => { $home = false, $expression = false, $quiz = true }}><i class="fas fa-pencil-alt fa-xl transition-all"></i></a>
</div>


<style>

    .active {
        color: rgba(165,180,252, 1);
    }

</style>