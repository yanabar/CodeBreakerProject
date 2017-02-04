let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || answer.attempt == '') {
        setHiddenFields();
    }
    if (!validateInput(input.value)) {
        return;
    }
    attempt.value++;

    if (getResults(input.value)){
       setMessage("You Win! :)");
       showAnswer(true);
       showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function getResults(input) {
    let myDiv = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for (i=0; i<input.length; i++) {
      //to see if the charather is in the correct place
        if (input.charAt(i) == answer.value.charAt(i)) {
            myDiv += '<span class="glyphicon glyphicon-ok"></span>';
      //to see if the character is our answer but not in the right place
      //> -1 WHY? the index of will turn -1 in the event of no matching characters in value but for each instance of a character in that value it will iteriate by 1 so 0 ,1 etc
    }else if (answer.value.indexOf(input.charAt(i)) > -1) {
            myDiv += '<span class="glyphicon glyphicon-transfer"></span>';
        //no match
        }else {
            myDiv += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    //close our divs
    myDiv += '</div></div>';
    //grab element from the DOM
    document.getElementById('results').innerHTML += myDiv;

    if (input == answer.value){
        return true;
    }// we dont need else as we do a return in our condition
    return false;
}

function setHiddenFields() {
  //In order to add a zero to the front of an answer, it must be a string, not a number
    answer.value = Math.floor(Math.random()*10000).toString();
    while (answer.value.length < 4) {
        answer.value += '0';
    }
    attempt.value = '0';
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function showAnswer(sucess){
  //grab code element from the DOM
    let code = document.getElementById('code');
    if (success) {
        code.className += ' success';
    } else {
        code.className += ' failure';
    }
    code.innerHTML = answer.value;
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}

function validateInput(input) {
    if (input.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }// no need for else statement here
    return true;
}
