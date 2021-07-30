//DOM Element Declaration
var card = $(".inner");

//Variable Declarations
var amount = 10;

//Code
fetch(`https://opentdb.com/api.php?amount=${amount}&category=20&difficulty=easy&type=multiple`)
.then(response => response.json()
.then(data => console.log(data)));

alert($(window).width());

//DOM Event Listeners
card.click(() => card.toggleClass("is-flipped__Y"));
