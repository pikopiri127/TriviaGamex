//window.onload = function() {
$(document).ready(function () {
    //    game.initialize();
    $("#start-button").on("click", game.start);
    $("#done-button").on("click", game.done);
});

// VARIABLES
// ====================================================================
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswer = 0;
var clockRunning = false;
var collectAnswerNumber = 0
var incorrectAnswerNumber = 0
var UnanweredNumber = 0
var answer = []

var trivia = [
    {
        question: "What does 'domo arigato' mean?",
        choice1: "Goodbye", choice2: "Please", choice3: "Thank you", choice4: "Hello"
    },
    {
        question: "What is 'origami'?",
        choice1: "art of folding paper", choice2: "art of dwarfing trees", choice3: "art of arranging flowers", choice4: "art of using swords"
    },
    {
        question: "What is 'bonsai'?",
        choice1: "art of dwarfing trees", choice2: "art of folding paper", choice3: "art of arranging flowers", choice4: "art of making tea"
    },
    {
        question: "What is hello in japanese?",
        choice1: "arigatou", choice2: "konnichiwa", choice3: "sayounara", choice4: "umeboshi"
    },
    {
        question: "Which country is the closest to Japan?",
        choice1: "Russia", choice2: "France", choice3: "China", choice4: "Korea"
    },
]

var choice = []

//  Variable that will hold our setInterval that runs the game
var intervalId;

// FUNCTIONS
// ====================================================================

var game = {

    time: 0,
    lap: 1,

    initialize: function () {
        console.log(clockRunning)
        if (!clockRunning) {
            //    clockRunning = false;
            game.time = 00;
            game.lap = 1;

            // DONE: Change the "timer" span to "00:00."
            $("#timer").text("00:00");

            // DONE: Empty the "laps" div.
            $("#laps").text("");
        }
    },

    // Game starts
    start: function () {
        clockRunning = true;
        console.log("Start function")
        document.getElementById("start-button").style.visibility = "hidden";

        for (var i = 0; i < trivia.length; i++) {
            var question = trivia[i].question
            var form = '<form name="form' + i + '">'
            var formClose = '</form>'
            var choiceText1 = '<input id="radio" type="radio" name="radio"'
            var choiceText20 = ' value=' + 1 + '/>'
            var choiceText21 = ' value=' + 2 + '/>'
            var choiceText22 = ' value=' + 3 + '/>'
            var choiceText23 = ' value=' + 4 + '/>'
            var choiceText3 = '</input>'
            var choice1 = trivia[i].choice1
            var choice2 = trivia[i].choice2
            var choice3 = trivia[i].choice3
            var choice4 = trivia[i].choice4

            var text = question + "<br>" + form + choiceText1 + choiceText20 + choice1 + choiceText1 + choiceText21 + choice2 + choiceText1 + choiceText22 + choice3 + choiceText1 + choiceText23 + choice4 + choiceText3 + formClose + "<br><br>"
            $(".container").append(text);
            console.log(text)
        }

        $(".container").append('<button type="button" id="done-button">DONE</button>')
        console.log("clockRunning: " + clockRunning);
        game.time = 30;
        game.countDown();
    },
    //        }

    countDown: function () {
        // DONE: Use setInterval to start the count down here and set the clock to running.
        console.log("game.countDown");
        console.log("clockRunning: " + clockRunning);
        if (clockRunning) {
            intervalId = setInterval(game.count, 1000);
            console.log("intervalId: " + intervalId);
        }
        // DONE button clicked
        $("#done-button").on("click", game.done);
    }
    ,

    count: function () {
        // decrement time by 1, remember we cant use "this" here.
        game.time--;

        // DONE: Get the current time, pass that into the game.timeConverter function,
        //       and save the result in a variable.
        var converted = game.timeConverter(game.time);
        console.log("game.time: " + game.time);
        console.log(converted);

        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#timer").text(converted);

        // Game timeout
        if (game.time === 0) {
            game.done();
        }
    },

    timeConverter: function (t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    },

    done: function () {
        console.log("game.done");
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;

        game.checkRadioButton();
        game.checkAnswer();

        //Display result screen
        document.getElementById("display").style.visibility = "hidden";
        var text = '<h1> ALL DONE!! </h1><br><br><p>Correct Answers: ' + collectAnswerNumber + '<br><p>Incorrect Answers: ' + incorrectAnswerNumber + '<br><p>Unanswered: ' + UnanweredNumber
        $(".container").html(text);
    },

    checkRadioButton: function () {

        for (i = 0; i < 4; i++) {
            if (document.form0.elements[i].checked) {
                console.log(document.form0.elements[i].value)
                answer[0] = document.form0.elements[i].value
            }
            if (!answer[0])
            answer[0] = 9
        }
        for (i = 0; i < 4; i++) {
            if (document.form1.elements[i].checked) {
                console.log(document.form1.elements[i].value)
                answer[1] = document.form1.elements[i].value
            }
            if (!answer[1])
            answer[1] = 9
        }
        for (i = 0; i < 4; i++) {
            if (document.form2.elements[i].checked) {
                console.log(document.form2.elements[i].value)
                answer[2] = document.form2.elements[i].value
            }
            if (!answer[2])
            answer[2] = 9
        }
        for (i = 0; i < 4; i++) {
            if (document.form3.elements[i].checked) {
                console.log(document.form3.elements[i].value)
                answer[3] = document.form3.elements[i].value
            }
            if (!answer[3])
            answer[3] = 9
        }
        for (i = 0; i < 4; i++) {
            if (document.form4.elements[i].checked) {
                console.log(document.form4.elements[i].value)
                answer[4] = document.form4.elements[i].value
            }
            if (!answer[4])
            answer[4] = 9
        }
    },

    checkAnswer: function () {
        var collectAnswer = [3, 1, 1, 2, 1]
        console.log(collectAnswer)
        console.log("collectAnswer[0]: " + collectAnswer[0])
        console.log("collectAnswer[1]: " + collectAnswer[1])
        console.log("collectAnswer[2]: " + collectAnswer[2])
        console.log("collectAnswer[3]: " + collectAnswer[3])
        console.log("collectAnswer[4]: " + collectAnswer[4])
        console.log(answer)

//        if collectAnswer[0] === answer[0] 
//        {console.log("correct")}

//        for (i = 0; i < 4; i++) {
//            if collectAnswer[0] === game.answer[0] {
//                collectAnswerNumber++ 
//                console.log("correct " + i)
//            }
//            else if 
//            collectAnswer[0] === 9 {
//                UnanweredNumber++ 
//                console.log("incorrect " + i)
//            }
//        }
}


};

