//DOM Element Declaration
var card = $(".inner");
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const responseContainerEl = document.getElementById('response-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const modalEl = document.getElementById("mymodal");
const gameContainerEl = document.getElementById("game-container");
const backContent = document.getElementById("card-body");
const gifImg = document.getElementById("gif");
const correctAnswer = document.getElementById("correct"); 
const incorrectAnswer = document.getElementById("incorrect");  
const correctAnswers = document.getElementById ("correctAnswers"); 
const incorrectAnswers = document.getElementById ("incorrectAnswers"); 
const totalPlayed = document.getElementById ("total_games_played"); 
const resultmodal = document.getElementById ("result-modal"); 
const resetbtn = document.getElementById ("Reset");

//Global Variable
let currentQuestionIndex = 0;
var gobal_data;
var amount; 

var player;
var correct_answers = 0;
var incorrect_answers = 0;
var games_played = 0;


gameContainerEl.classList.add('hide');
responseContainerEl.classList.add("hide");
correctAnswers.textContent = "Correct answers : " + correct_answers; 
incorrectAnswers.textContent = "Incorrect answers : " + incorrect_answers; 

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
    responseContainerEl.classList.remove("hide");
  });
};

// alert($(window).width());

function startGame() {
  player = document.getElementById("player_name").value; //get player name
  var category = document.getElementById("trivia_category").value; //get index selected
  var difficulty = document.getElementById("difficulty").value; //get index selected
  var num_questions = document.getElementById("trivia_amount").value;
  amount = num_questions;  //get index selected
  if(player != "" && player)
  {
    load_save();
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
  if (currentQuestionIndex < data.length ) {
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
  }
  else {
    resultmodal.classList.remove('hide');    
    games_played++;
    save_data();
  }
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
  answers = randomize(answers);
  return answers;
};
//Randomize answers
var randomize = function(array){
  var new_array = [];
  var temp_array = array;
  for(var i = 0; i < array.length; i++)
  {
      var index = Math.floor(Math.random()*temp_array.length);
      new_array.push(temp_array[index]);
      temp_array = removefromArray(temp_array[index],temp_array);
  }
  return new_array;
};

//Removes Items from Array
var removefromArray = function(value,array) {
  new_array = [];
  for(var i = 0; i < array.length; i++)
  {
      if(array[i] !== value)
      {
          new_array.push(array[i]);
      }
  }
  return new_array;
  };

var fetch_gify = () => {
  fetch('https://api.giphy.com/v1/gifs/search?q=correct&rating=pg&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1')
    // Convert the response to JSON
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
      backContent.appendChild(gifImg);
      backContent.appendChild(correctAnswers);
      backContent.appendChild(incorrectAnswers);
      backContent.appendChild(nextButton); 
      if (currentQuestionIndex == amount -1 ){
        nextButton.innerHTML = "Finish";
      };
     
      })
    };

  var fetch_gify_sad = () => {
      fetch('https://api.giphy.com/v1/gifs/search?q=wrong&rating=pg&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1')
        // Convert the response to JSON
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
          backContent.appendChild(gifImg);
          backContent.appendChild(correctAnswers);
          backContent.appendChild(incorrectAnswers);
          backContent.appendChild(nextButton);
          if (currentQuestionIndex == amount -1 ){
            nextButton.innerHTML = "Finish";
          };
         
          })
        
        };

function selectAnswer(e) {
  const selectedButton = e.target.getAttribute("data-value"); 
if (selectedButton === 'correct'){   
  correct_answers = correct_answers + 1; 
  correctAnswers.textContent = "Correct answers : " + correct_answers; 
  incorrectAnswers.textContent = "Incorrect answers : " + incorrect_answers;  
  fetch_gify(); 
}

else{ 
  incorrect_answers = incorrect_answers + 1; 
  correctAnswers.textContent = "Correct answers : " + correct_answers; 
  incorrectAnswers.textContent = "Incorrect answers : " + incorrect_answers; 
  fetch_gify_sad(); 
}

 
  resetState(); 
  card.toggleClass("is-flipped__Y")
  nextButton.classList.remove('hide')

 
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

var save_data = () => {
  var saved = JSON.parse(localStorage.getItem("trivia_save")) || [];
  let player = {
    name: document.getElementById("player_name").value,
    correct: correct_answers,
    played: games_played
  }
  var index = check_save(saved);
  if(index != -1){
    saved[index].correct = correct_answers;
    saved[index].played = games_played;
  }
  else {
    saved.push(player);
  }
  saved = organize(saved);
  localStorage.setItem("trivia_save", JSON.stringify(saved));
};

var organize = function(items) {
  var place_holder;

  for(outer_loop = 0; outer_loop < items.length; outer_loop++)
  {
      for(inner_loop = outer_loop+1; inner_loop < items.length; inner_loop++)
      {
          if(items[inner_loop].correct > items[outer_loop].correct)
          {
              //change positions
            place_holder = items[outer_loop];
            items[outer_loop] = items[inner_loop];
            items[inner_loop] = place_holder;
            place_holder = "";
          }
      }
  }
  if(items.length > 30)
  {
     items =  items.slice(0,29);
  }
  return items;
}

var check_save = (saved) => {
  for(var i = 0; i < saved.length; i++)
  {
    if(saved[i].name === player)
    {
      return i;
    }
  }
  return -1;
};

function load_save () {
  var saved = JSON.parse(localStorage.getItem("trivia_save")) || [];
  for(var i = 0; i < saved.length; i++)
  {
    if(check_save(saved) != -1){
      games_played = saved[check_save(saved)].played;
      return
    }
  }
};

//DOM Event Listeners
// card.click(() => card.toggleClass("is-flipped__Y")); 
startButton.addEventListener('click', startGame); 
nextButton.addEventListener('click', () => { 
card.toggleClass("is-flipped__Y");
currentQuestionIndex++; 
setNextQuestion(global_data);
});

resetbtn.addEventListener('click', function(){
  window.location.reload();
});