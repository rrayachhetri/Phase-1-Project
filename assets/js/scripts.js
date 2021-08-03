//DOM Element Declaration
var card = $(".inner");
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const modalEl = document.getElementById("mymodal");
const gameContainerEl = document.getElementById("game-container");
gameContainerEl.classList.add('hide');

//Global Variable
let currentQuestionIndex = 0;
var gobal_data;
var player;

var fetch_questions = (category,difficulty,amount) => {
    var URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    setNextQuestion(data.results);
    global_data = data.results;
    gameContainerEl.classList.remove('hide'); 
  });
};

// alert($(window).width());

function startGame() {
  player = document.getElementById("player_name").value; //get player name
  var category = document.getElementById("trivia_category").value; //get index selected
  var difficulty = document.getElementById("difficulty").value; //get index selected
  var num_questions = document.getElementById("trivia_amount").value; //get index selected
  if(player != "" && player)
  {
    modalEl.classList.add('hide');
    fetch_questions(category,difficulty,num_questions);
  }
  else {
      alert("Please add a player name");
  }
};

function setNextQuestion(data) {
  resetState()
  showQuestion(data);
};

function showQuestion(data) {
  questionElement.innerText = data[currentQuestionIndex].question;
    answer_array = get_answers(data);
    for(var i = 0; i < answer_array.length; i++)
    {
      const button = document.createElement('button');
      button.classList.add('btn');
      button.textContent = answer_array[i].answer;
      button.setAttribute("data-value",answer_array[i].type);
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    };
};

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

function get_answers (data) {
  var answers = [
    {
      answer: data[currentQuestionIndex].correct_answer,
      type: "correct"
    },
    {
      answer: data[currentQuestionIndex].incorrect_answers[0],
      type: "incorrect"
    },
    {
      answer: data[currentQuestionIndex].incorrect_answers[1],
      type: "incorrect"
    },
    {
      answer: data[currentQuestionIndex].incorrect_answers[2],
      type: "incorrect"
    }
  ];

  return answers;
};

function selectAnswer(e) {
 
  const selectedButton = e.target.getAttribute("data-value")

  if (currentQuestionIndex < global_data.length-1) {
  currentQuestionIndex++
  setNextQuestion(global_data);
  }
}; 


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
};

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
};

//DOM Event Listeners
card.click(() => card.toggleClass("is-flipped__Y")); 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion(global_data);
});

