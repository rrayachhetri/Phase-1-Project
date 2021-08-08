//DOM Declaration
ulEl = document.getElementById(list);

var load_save = () => {
    var saved = JSON.parse(localStorage.getItem("trivia_save")) || [];
    if(saved)
    {
        display_scores(saved);
    }
}

var display_scores = array => {
    for(let i = 0; i<array.length; i++)
    {
        itemEl = document.createElement(li);
        itemEl.textContent = array[i].name + ": " + array[i].correct;
        ulEl.appendChild(itemEl);
    }
}