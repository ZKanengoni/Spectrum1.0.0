import { writable } from 'svelte/store'

const home = writable(false)
const expression = writable(false)
const quiz = writable(false)

const quizScore = writable(0)
const quizTotal = writable(0)

const expressionScore = writable(0)
const expressionTotal = writable(0)

const currentQuiz = writable(0)

const endOfQuiz = writable(false)


export { home, expression, quiz, quizScore, quizTotal, expressionScore, expressionTotal, currentQuiz, endOfQuiz};