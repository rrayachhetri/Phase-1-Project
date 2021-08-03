//DOM Element Declaration
var card = $(".inner");
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

//Global Variable
let currentQuestionIndex = 0;
var gobal_data;

var fetch_questions = () => {

  fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // useApiData(data);
    setNextQuestion(data.results);
    global_data = data.results;
  });
};

var fetchHappy = "Happy"
var image = document.querySelector("#image-src")
var fetch_gify_correct = () => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?q= 
      ${fetchHappy}
      &api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=5`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      //console.log(response.data[1].images.original.url);
    var imageUrl = response.data[1].images.original.url;
      image.setAttribute("src", imageUrl);
    })
}

(fetch_gify_correct());

// var fetchSad = "Sad"
// var fetch_gify_wrong = () => {
//   fetch(
//     `https://api.giphy.com/v1/gifs/search?q= 
//       ${fetchSad}
//       &api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=5`
//   )
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(response) {
//       //console.log(response.data[1].images.original.url);
//     var imageUrl = response.data[1].images.original.url;
//       image.setAttribute("src", imageUrl);
//     })
// }

// (fetch_gify_wrong());

// alert($(window).width());

function startGame() {
  startButton.classList.add('hide');
  questionContainerElement.classList.remove('hide')
  fetch_questions();
};

function setNextQuestion(data) {
  resetState()
  showQuestion(data);
};

function showQuestion(data) {
  console.log(data);
  questionElement.innerText = data[currentQuestionIndex].question;
  console.log (data[currentQuestionIndex].question);
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

  // console.log (selectedButton)
  
  //correct

  //incorrect 


  
  if (currentQuestionIndex < 9) {
  currentQuestionIndex++
  console.log(currentQuestionIndex);
  setNextQuestion(global_data);
  }
}; 


  // const correct = selectedButton.dataset.correct
  // setStatusClass(document.body, correct)
  // Array.from(answerButtonsElement.children).forEach(button => {
  //   setStatusClass(button, button.dataset.correct)
  // })
  // if (  > currentQuestionIndex + 1) {
  //   nextButton.classList.remove('hide')
  // } else {
  //   startButton.innerText = 'Restart'
  //   startButton.classList.remove('hide')
  // }
// };

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

