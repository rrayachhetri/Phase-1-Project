//DOM Element Declaration
var card = $(".inner");
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple")
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    let data = response;
    console.log(data); 
    useApiData(data);
  })

function useApiData(data) {
  const questions = [
    {
      question: (data.results[0].question),
      answers: [
        { text: (data.results[0].correct_answer), correct: true },
        { text: (data.results[0].incorrect_answers[0]), correct: false },
        { text: (data.results[0].incorrect_answers[1]), correct: false },
        { text: (data.results[0].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[1].question),
      answers: [
        { text: (data.results[1].correct_answer), correct: true },
        { text: (data.results[1].incorrect_answers[0]), correct: false },
        { text: (data.results[1].incorrect_answers[1]), correct: false },
        { text: (data.results[1].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[2].question),
      answers: [
        { text: (data.results[2].correct_answer), correct: true },
        { text: (data.results[2].incorrect_answers[0]), correct: false },
        { text: (data.results[2].incorrect_answers[1]), correct: false },
        { text: (data.results[2].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[3].question),
      answers: [
        { text: (data.results[3].correct_answer), correct: true },
        { text: (data.results[3].incorrect_answers[0]), correct: false },
        { text: (data.results[3].incorrect_answers[1]), correct: false },
        { text: (data.results[3].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[4].question),
      answers: [
        { text: (data.results[4].correct_answer), correct: true },
        { text: (data.results[4].incorrect_answers[0]), correct: false },
        { text: (data.results[4].incorrect_answers[1]), correct: false },
        { text: (data.results[4].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[5].question),
      answers: [
        { text: (data.results[5].correct_answer), correct: true },
        { text: (data.results[5].incorrect_answers[0]), correct: false },
        { text: (data.results[5].incorrect_answers[1]), correct: false },
        { text: (data.results[5].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[6].question),
      answers: [
        { text: (data.results[6].correct_answer), correct: true },
        { text: (data.results[6].incorrect_answers[0]), correct: false },
        { text: (data.results[6].incorrect_answers[1]), correct: false },
        { text: (data.results[6].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[7].question),
      answers: [
        { text: (data.results[7].correct_answer), correct: true },
        { text: (data.results[7].incorrect_answers[0]), correct: false },
        { text: (data.results[7].incorrect_answers[1]), correct: false },
        { text: (data.results[7].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[8].question),
      answers: [
        { text: (data.results[8].correct_answer), correct: true },
        { text: (data.results[8].incorrect_answers[0]), correct: false },
        { text: (data.results[8].incorrect_answers[1]), correct: false },
        { text: (data.results[8].incorrect_answers[2]), correct: false }
      ]
    },
    {
      question: (data.results[9].question),
      answers: [
        { text: (data.results[9].correct_answer), correct: true },
        { text: (data.results[9].incorrect_answers[0]), correct: false },
        { text: (data.results[9].incorrect_answers[1]), correct: false },
        { text: (data.results[9].incorrect_answers[2]), correct: false }
      ]
    }
  ]
console.log (questions);

var amount = 10;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions
  //.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


// alert($(window).width());

//DOM Event Listeners
card.click(() => card.toggleClass("is-flipped__Y")); 

};