
amount = 10;
fetch(`https://opentdb.com/api.php?amount=${amount}&category=20&difficulty=easy&type=multiple`)
.then(response => response.json()
.then(data => console.log(data)));