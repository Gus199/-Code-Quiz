

var quizQuestions = [ 
    {
       question: "Which HTML tag do we use in < > to include JavaScript?",
       choiceA: "a",
       choiceB: "body",
       choiceC: "javascript",
       choiceD: "link" ,
       answer: "c"
    } , 
   {
       question: "which is used to style a webpage?",
       choiceA: "html",
       choiceB: "css",
       choiceC: "javascript",
       choiceD: "python",
       answer: "b" },
   {
       question: "what does JSON.parse do?",
       choiceA: "turn an object to a string",
       choiceB: "adds a click event",
       choiceC: "turns a string into an object",
       choiceD: "nothing",
       answer: "c" },
   {
       question: "Which of these operators can be used to combine two strings together into one?",
       choiceA: "&",
       choiceB: "none",
       choiceC: "+",
       choiceD: "all Above",
       answer: "c" },
   {
       question: "which item cannot be stored in an array?",
       choiceA: "string",
       choiceB: "number",
       choiceC: "another array",
       choiceD: "background color",
       answer: "d" },
   {
       question: "what does === mean?",
       choiceA: "equal to",
       choiceB: "not equal to",
       choiceC: "sometimes equal to",
       choiceD: "something else",
       answer: "a" },
   ];
   
   
   var startQ = document.getElementById("startQuiz");
   var questionEl = document.getElementById("question");
   var checkAnswer = document.getElementById("answer");
   var showAnswer = document.getElementById("checkAnswer");
   var quiz = document.getElementById("mainQuiz");
   var quizTimer = document.getElementById("timer");
   var buttonA = document.getElementById("a");
   var buttonB = document.getElementById("b");
   var buttonC = document.getElementById("c");
   var buttonD = document.getElementById("d");
   var finalScoreEl = document.getElementById("finalscore");
   var fscore = document.getElementById("fscore");
   var endQuiz = document.getElementById("end");
   var initialsEl = document.getElementById("initials")
   var submitBtn = document.getElementById("submit")
   var scoretest = document.getElementById("scoretest");
   
   var timeLeft = 60;
   var timerInterval;
   var finalQuestionIndex = quizQuestions.length;
   var currentQuestionIndex = 0;
   var score = 0;
   var qscore =0;
   var correct;
   
   
   function startQuiz(){
         generateQuizQuestion(); 
       
      // start a timer
        timerInterval = setInterval(function() {
             timeLeft--;
             quizTimer.textContent = "Time Left : " + timeLeft;
         
             if(timeLeft === 0) {
               
               showScore();
                   
               }
         
           }, 1000);
         
           
         }
   
        
        
   function Answer(answer){
      
     
   correct = quizQuestions[currentQuestionIndex].answer;
   
       if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
           showCorrect();
           score++;
           console.log(score)
           currentQuestionIndex++;
           qscore=score;
           if(currentQuestionIndex !== finalQuestionIndex){
               setTimeout( function() { generateQuizQuestion(); }, 1000);
           }else{
               showScore(); 
           }
       
       }
       else if (answer !== correct ){
           showWrong();
           timeLeft = timeLeft - 10;
           currentQuestionIndex++;
           if(currentQuestionIndex !== finalQuestionIndex){
           setTimeout( function() { generateQuizQuestion(); }, 1000);
             }else{
               showScore(); 
           }
   
   
       }
       else {
          
           showScore();
       }
     window.localStorage.setItem("score", score);
   }
   function showWrong(){
   showAnswer.style.display = "block";
   checkAnswer.innerHTML="Wrong :(";
   
   }
   
   function showCorrect(){
   showAnswer.style.display = "block";
   checkAnswer.innerHTML ="Correct :)";
    
   }
   
   function generateQuizQuestion(){
       checkAnswer.innerHTML ="";
       
       var currentQuestion = quizQuestions[currentQuestionIndex];
       questionEl.innerHTML = '<p>'+ currentQuestion.question + '</p>';
       buttonA.innerHTML= currentQuestion.choiceA;
       buttonB.innerHTML = currentQuestion.choiceB;
       buttonC.innerHTML= currentQuestion.choiceC;
       buttonD.innerHTML = currentQuestion.choiceD;
       if(currentQuestionIndex === finalQuestionIndex){
   
           clearInterval(timerInterval);
        
         return showScore();
             
       } 
     
   }
   function showScore() {
       timeLeft=0;
       window.location.href= "scorePage.html";
       
     } 
   function scoreQ(){
      // document.getElementById("scoresDiv").style.display="None";
       qscore=localStorage.getItem('score')
       finalScoreEl.innerHTML = "Your Score Is " + qscore;
       initialsEl.value = "";
       
   }
   
   function saveScore() {
       var initials = initialsEl.value.trim();
   
       if(initials !== "initials "){
           var highScores = JSON.parse(window.localStorage.getItem("highscores"))|| [];
           var newScore = {
               finalScoreEl: qscore, 
               initials: initials
           };
           highScores.push(newScore)
           window.localStorage.setItem("highscores", JSON.stringify(highScores))
       };
       console.log(highScores);
       scoretest.style.display="none";
       
       getScores();
   };
   
   function getScores(){
       window.location.href= "scoreLists.html";
       //document.getElementById("scoresDiv").style.display="block";
       var Scores = JSON.parse(localStorage.getItem("highscores")) || [];
       for (i=0; i<Scores.length; i++){
           var x = document.createElement("LI");
           var t = document.createTextNode(Scores[i].initials +" "+": "+Scores[i].finalScoreEl);
            x.appendChild(t);
            document.getElementById("myList").appendChild(x);
   
           
       }
   }
   
   function restartQuiz(){
       window.location.href = "quizPage.html";
       timeLeft = 60;
       score = 0;
       currentQuestionIndex = 0;
       showAnswer.style.display = "none";
   
   }
   
   
   function linkToScoresList(){
      // window.location.href= "scorePage.html";
      // scoretest.style.display="none";
      var Scores = JSON.parse(localStorage.getItem("highscores")) || [];
       for (i=0; i<Scores.length; i++){
           var x = document.createElement("LI");
           var t = document.createTextNode(Scores[i].initials +" "+": "+Scores[i].finalScoreEl);
            x.appendChild(t);
            document.getElementById("myList").appendChild(x);
   
           
       }
   
   }
   
   
   