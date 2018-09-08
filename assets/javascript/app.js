// start game with series of 10 questions, looping through each one at a time per answer "click" event

// each question will be objects within the overall var

$(document).ready(function() {
var marvelQuestions = [
{
  question: "Which movie started off the Marvel Cinematic Universe?",
  correctAnswer: 2,
  choices: [
    "The Amazing Spider-Man", 
    "The Incredible Hulk", 
    "Iron Man", 
    "Captain America: The First Avenger"
]
}, 

{
  question: "What was the name of the alien army Loki lead in the first Avengers movie?",
  correctAnswer: 3,
  choices: [
    "Kree",
    "Lokists",
    "Dark Elves",
    "Chutari"
  ] 
},    


{
  question: "Who destroyed Thor's hammer, Mjolnir?",
  correctAnswer: 0,
  choices: [
    "Hela",
    "Thanos",
    "Odin",
    "Malekeith",
  ]
},

{
  question: "Which Infinity Stone powers Vison?",
  correctAnswer: 2,
  choices: [
    "Time",
    "Power",
    "Mind",
    "Soul",
  ]
},

{
  question: "In Guardians of the Galaxy Vol. 2, what type of being is Peter Quill's father, Ego?",
  correctAnswer: 0,
  choices: [
    "Celestial",
    "Eternal",
    "Watcher",
    "Titan",
  ],
},

{
  question: "After Iron Man lost Jarvis, what did he name his new AI?",
  correctAnswer: 1,
  choices: [
    "Jarvis II",
    "Friday",
    "Veronica",
    "Karen",
  ]
},

{
  question: "In Iron Man 3, 'The Mandarin' turned out to be an actor playing the role of Mandarin. What was this actor's name?",
  correctAnswer: 3,
  choices: [
    "Tobey Slattery",
    "Teddy Slattery",
    "Terence Slattery",
    "Trevor Slattery",
  ]
},

{
  question: "In 'Avengers: Infinity War', where did Thanos have to go to obtain the Soul Stone?",
  correctAnswer: 2,
  choices: [
    "Knowhere",
    "Asgard",
    "Vormir",
    "Nidavellir",
  ]
},

{
  question: "'Tahiti...it's ________?'",
  correctAnswer: 2,
  choices: [
    "'a great place'",
    "'a cool place'",
    "'a magical place'",
    "'not my kinda place'",
  ]
},

{
  question: "As of the movie 'Avengers: Infinity War', how many movies are there currently in the Marvel Cinematic Universe?",
  correctAnswer: 1,
  choices: [
    "20",
    "19",
    "18",
    "17",
  ]
}];

var correctGuesses = 0;
var incorrectGuesses = 0;
var missedAnswers = 0;
var timer = 30;
var timeInterval;
var userGuess ="";
var triviaRunning = false;
var allAnswered = marvelQuestions.length;
var currentQuestion;
var index;
var newArray
var placeholder = [];

// set START button
$("#start").on("click", function () {
  console.log("#start");
  $("#start").hide();
  $("#reset").hide();
  displayQuestion();
  timerGo();
  for(var i = 0; i < marvelQuestions.length; i++) {
    placeholder.push(marvelQuestions[i]);
  }
})

// each question will have a time limit of 30 seconds to answer 
function timerGo(){
	if (!triviaRunning) {
	timeInterval = setInterval(decreaseTime, 1000); 
	triviaRunning = true;
	}
}

function decreaseTime() {
	$(".timeDiv").html("<h3>" + "Time Remaining: " + timer + "</h3>");
	timer --;
	if (timer === 0) {
		missedAnswers++;
		stop(timerGo);
    $(".answerDiv").html("<p>TIME UP!!! The correct answer is: " + currentQuestion.choices[currentQuestion.correctAnswer] + "</p>");
    checkScore();
  }
}

function stopTime() {
	triviaRunning = false;
	clearInterval(timeInterval);
}

// use jquery to apply var to html div as well as make the answer choices visible and selectable

function displayQuestion() {
  // display questions at random per refresh
	index = Math.floor(Math.random() * marvelQuestions.length)
  currentQuestion = marvelQuestions[index];

  // Loop through answer array of each question to print
  $(".questionDiv").html("<h2>" + currentQuestion.question + "</h2>");
		for(var i = 0; i < currentQuestion.choices.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(currentQuestion.choices[i]);
			//assign array to div so it can check answer
			userChoice.attr("data-guessvalue", i);
      $(".answerDiv").append(userChoice);
    }
  }

// click function to choose answers
$(".answerchoice").on("click", function() {
	//get array from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//if else statements depending on CORRECT or INCORRECT answer
	if (userGuess === currentQuestion.correctAnswer) {
		stop(timerGo);
		correctGuesses++;
		userGuess="";
    $(".answerDiv").html("<p>Correct!</p>");
    checkScore();

	} else {
		stop();
		incorrectGuesses++;
		userGuess="";
    $(".answerDiv").html("<p>That is incorrect. The correct answer is: " + currentQuestion.choices[currentQuestion.correctAnswer] + "</p>");
    checkScore ();
	}
})


// calculate score after player finishes quiz

function checkScore () {
  $(".answerDiv");
  newArray.push(currentQuestion);
  marvelQuestions.splice(index,1);

  var endGame = setTimeout (function() {
    $(".answerDiv").empty();
    timer= 20;

  if ((incorrectGuesses + correctGuesses + missedAnswers) === allAnswered) {
		$(".questionDiv").empty();
		$(".questionDiv").html("<h3>Game Over!  Here's how you did: </h3>");
		$(".answerDiv").append("<h4> Correct: " + correctGuesses + "</h4>" );
		$(".answerDiv").append("<h4> Incorrect: " + incorrectGuesses + "</h4>" );
		$(".answerDiv").append("<h4> Unanswered: " + missedAnswers + "</h4>" );
		$("#reset").show();
		correctGuesses = 0;
		incorrectGuesses = 0;
    missedAnswers = 0; 
	} else {
		runTimer();
		displayQuestion();
  }
},
  1000 * 3)
}


// set RESET button
$("#reset").on("click", function() {
	$("#reset").hide();
	$(".answerDiv").empty();
	$(".questionDiv").empty();
	for(var i = 0; i < placeholder.length; i++) {
		marvelQuestions.push(placeholder[i]);
	}
	timerGo();
	displayQuestion();
})

})