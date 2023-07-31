// Defining necessary DOM elements
var questionEl = document.getElementById('question'); // The element that will display the quiz question
var optionsEl = document.querySelector('.quiz-options'); // The element that will display the answer options
var checkBtn = document.getElementById('check-answer'); // The button to check if the answer is correct
var playAgainBtn = document.getElementById('play-again'); // The button to restart the quiz
var resultEl = document.getElementById('result'); // The element to display if the answer was correct or incorrect
var correctScoreEl = document.getElementById('correct-score'); // The element to display the current score
var totalQuestionEl = document.getElementById('total-question'); // The element to display the total number of questions

var correctAnswer; // Variable to store the correct answer
var askedCount = 0; // Counter for the number of asked questions
var correctScore = 0; // Counter for the number of correctly answered questions
var totalQuestions = 5; // Total number of questions in the quiz

// Function to load the question from the Open Trivia Database API
async function loadQuestion(){
    var APIUrl = 'https://opentdb.com/api.php?amount=' + totalQuestions + '&category=21&difficulty=easy&type=multiple';
    var result = await fetch(APIUrl);
    var data = await result.json();
    resultEl.innerHTML = "";
    showQuestion(data.results[askedCount]); // Calls function to display the question
}

// Function to attach event listeners to buttons
function eventListeners(){
    checkBtn.addEventListener('click', checkAnswer);
    playAgainBtn.addEventListener('click', restartQuiz);
}

// Event listener to load the quiz question and attach event listeners when the document is ready
document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    totalQuestionEl.textContent = totalQuestions;
    correctScoreEl.textContent = correctScore;
});

// Function to display the question and answer options
function showQuestion(data){
    checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    questionEl.innerHTML = `${data.question}`;
    optionsEl.innerHTML = `${optionsList.map((option, index) => `<li> ${index + 1}. <span>${option}</span> </li>`).join('')}`;
    selectOption(); // Calls function to add event listeners to the answer options
}

// Function to add event listeners to the answer options
function selectOption(){
    optionsEl.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(optionsEl.querySelector('.selected')){
                optionsEl.querySelector('.selected').classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// Function to check if the selected answer is correct
function checkAnswer(){
    checkBtn.disabled = true;
    if(optionsEl.querySelector('.selected')){
        let selectedAnswer = optionsEl.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            resultEl.innerHTML = `<p style="color: green;"><i class = "fas fa-check"></i>Correct Answer!</p>`; // This changes the color to green
        } else {
            resultEl.innerHTML = `<p style="color: blue;"><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`; // This changes the color to red
        }
        askedCount++;
        checkCount(); // Calls function to check if all questions have been asked
    } else {
        resultEl.innerHTML = `<p style="color: orange;"><i class = "fas fa-question"></i>Please select an option!</p>`; // This changes the color to orange
        checkBtn.disabled = false;
    }
}

// Function to decode HTML entities in the question and answer text
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

// Function to check if all questions have been asked and display the final score if they have
function checkCount(){
    setCount();
    if(askedCount == totalQuestions){
        resultEl.innerHTML += `<p><span style="color: red;">Your score is ${correctScore} out of ${totalQuestions}.</span></p>`;
        playAgainBtn.style.display = "block";
        checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}


// Function to update the score and total question count
function setCount() {
    totalQuestionEl.textContent = totalQuestions;
    correctScoreEl.textContent = correctScore;
}

// Function to restart the quiz
function restartQuiz(){
    correctScore = 0;
    askedCount = 0;
    playAgainBtn.style.display = "none";
    checkBtn.style.display = "block";
    checkBtn.disabled = false;
    setCount();
    loadQuestion();
}

// Event listener to load the quiz question and attach event listeners when the document is ready
document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    totalQuestionEl.textContent = totalQuestions;
    correctScoreEl.textContent = correctScore;
});
