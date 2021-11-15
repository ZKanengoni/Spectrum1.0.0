<script>
    import { onMount } from 'svelte';
    import * as faceapi from 'face-api.js'
	import Timer from 'easytimer.js';
	import { expressionScore } from '$lib/stores'
	import { goto } from '$app/navigation';

    $: video = {};
	$: btnTry = {};
	$: outputLabel = {};
	$: progressBar = {}
	$: error = false;
	$: messageOutput = {}
	$: messageColour = ''
	$: message = ''

	$expressionScore = 0
	
	let correct = 0
	let display = false

    const MODEL_URL = '../models';
	const emotions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised'];

    let randomEmotion = emotions[Math.floor(Math.random() * 6)];
	let expressionResults = [];
	
	const timer = new Timer();

	let questionNumber = 0;
	

    onMount( () => {
        video = document.getElementById('video');
		btnTry = document.querySelector('.try');
		outputLabel = document.querySelector('.results');
		messageOutput = document.querySelector('.messageOutput')
		progressBar = document.querySelector('.progress');

        const loadModels = async () => {
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
			]).then(startVideo);
		};

		loadModels();

		const getDetection = () => {
			expressionResults = [];

			timer.start({
				countdown: true,
				startValues: {
					seconds: 6
				}
			});

			timer.addEventListener('secondsUpdated', (e) => {
				outputLabel.innerText = timer.getTimeValues().seconds;
			});

			timer.addEventListener('targetAchieved', async () => {
				outputLabel.innerText = 'Analyzing...';

				const detection = await faceapi
					.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				if (detection.length > 0) {
					expressionResults[0] = detection[0].expressions;

					console.log(expressionResults);
					checkAnswer(detection[0].expressions);
					
				}
			});
		};

		btnTry.addEventListener('click', getDetection);
    })

    function startVideo() {
		navigator.mediaDevices.getUserMedia({ video: {} }).then(
			(stream) => {
				video.srcObject = stream;
			},
			(err) => console.error(err)
		);
	}

	function checkAnswer(detections) {

		if (detections[randomEmotion] >= 0.5) {
			messageOutput.innerText = 'Well done!';
			messageColour = 'green';
			correct += 1
			$expressionScore += Math.floor(100 * detections[randomEmotion])
			nextQuestion()
		} else {
			messageOutput.innerText = "Let's try again.";
			messageColour = 'red';

			clear()
		}
			
	}

	function nextQuestion() {

		clear()

		if (questionNumber < 6) {

			randomEmotion = emotions[Math.floor(Math.random() * 7)];
			progressBar.style.width = `${(questionNumber / 6) * 100}%`;
			
			++questionNumber;

			console.log(`Expressoin Results: ${expressionResults.length}`)

			if (questionNumber > 6) {
				display = true
			}
		}
	}

	function clear() {
		outputLabel.innerText = '';

		setTimeout( () => {
			messageOutput.innerText = '';
			messageColour = ''
		}, 4000)

	}

	function resetGame() {
		display = false
		correct = 0
		$expressionScore = 0
		progressBar.style.width = `0%`;
		randomEmotion = emotions[Math.floor(Math.random() * 7)];
	}

</script>

<div class="alert w-4/5 h-48 bg-white border-2 border-dashed border-gray-400 absolute rounded-2xl  top-0 left-0 bottom-0 right-0 mt-48 mx-auto hidden" class:display >
    <div class="w-full h-3/4 border-b-2 border-dashed border-gray-400 text-center text-lg text-gray-500 p-5 font-normal">
        {#if correct > (emotions.length / 2)}
            <p>Well done! You scored {correct}/6!</p>
        {:else}
            <p>Good try! Let's try beat {correct}/6 next time.</p>
        {/if}
        <p class="text-indigo-300">Your score is {$expressionScore}pts</p>
    </div>
    <div class="w-full h-1/4 flex justify-around pt-2">
        <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-blue-300" on:click={() => { goto('/expression'), resetGame()}}>Finish</button>
        <button class="w-20 h-7  rounded-full text-center text-white text-sm bg-purple-300" on:click={() => { resetGame(), $expressionScore = 0 }}>Retry</button>
    </div>
 
</div>

<div class="w-4/5 h-11 border-2 border-gray-400 border-dashed text-center mx-auto my-5 rounded-lg bg-{messageColour}-200 transition-all">
	<p class="messageOutput mt-2 transition-all text-gray-600">{message}</p>
</div>

<div class="w-3/5 h-8 border-2 border-gray-400 border-dashed mx-auto rounded-full mb-5 mt-2">
	<div class="progress w-0 h-full bg-blue-200 rounded-full transition-all"></div>
</div>

<div class="w-4/5 h-80 border-2 border-dashed border-gray-400 mx-auto rounded-xl mt-3">
    <div class="w-full h-3/4 border-b-2 border-dashed border-gray-400 pt-2 text-center">
		<p class="results text-lg text-gray-600 mb-2">Ready?</p>
        <div class="w-44 h-44 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <video id="video" autoplay muted class="w-98 h-48"/>
        </div>
      
    </div>
    <div class="w-full h-1/4 rounded-b-xl text-center">
		<button class="try w-28 h-8 rounded-full text-center text-white text-sm bg-red-300 mt-5">Detect</button>
	</div>
</div>

<div class="w-4/5 h-16 border-2 border-dashed border-gray-400 mx-auto mt-5 rounded-lg text-center capitalize text-gray-600 text-lg">
	<p class="mt-4">{randomEmotion}</p>
</div>


<style>
	.display {
        display: block;
    }
</style>