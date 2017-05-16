const quiz = {
  questions: [
    {
      id: 0,  
      question: "What is the capital of Maine?",
      answer: ['Augusta', 'Bangor', 'Lake City', 'Waterville'],
      correctAnswer: 0
    },
    {
      id: 1,
      question: "What is the capital of Wyoming?",
      answer: ['Cody', 'Laramie', 'Cheyenne', 'Yellowstone'],
      correctAnswer: 2
    },
     {
      id: 2,
      question: "What is the capital of California?",
      answer: ['Sacramento', 'Los Angeles', 'San Diego', 'San Francisco'],
      correctAnswer: 0
    }
  ],

  userAnswer: [],
  correctAnswers: [],
  currentQuestion: null

};

//////////////////////////MOD FUNCTIONS//////////////////////////////////

  function selectAnswer(answer){
   return quiz.userAnswer.push(answer);
  }

  let idNumber = 0;
  //Note to come back to this and put it in the state(currentQuestion)
  function questionsIdIteration(){
      idNumber++;
      return idNumber;
  }

  //Note to come back and combine questionsIDIteration and nextQuestion

  function nextQuestion(){
      return quiz.questions[idNumber].question;
  }

  function correctAnswerChecker(userAnswer, correctAnswer) {
    if(userAnswer === correctAnswer) {
        quiz.correctAnswers.push(userAnswer);
    }
  }

  const render = (element = $('div#js-question'), 
                answerCounter = $('div.js-answer-counter'),
                 correctCounter = $('div.js-correct-counter'), 
                 state = quiz)=>{
      const path= state.questions[idNumber].answer;
      const numberOfQuestions = quiz.questions.length;
      const numberOfCorrectQuestions = quiz.correctAnswers.length;
      const answerBox = `<p>Answered so far: ${idNumber}/${numberOfQuestions}</p>`;
      const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`
      const question =  
        ` <ul>
          <li>${state.questions[idNumber].question}</li>
            <form id="js-current-question">
                <p>${path[0]}</p> <input type="radio" name="Answers" value="${path[0]}"><br>
                <p>${path[1]}</p> <input type="radio" name="Answers" value="${path[1]}"><br>
                <p>${path[2]}</p> <input type="radio" name="Answers" value="${path[2]}"><br>
                <p>${path[3]}</p> <input type="radio" name="Answers" value="${path[3]}"> <br>
                <button type='submit' id="submit">Submit</button>
            </form>
        </ul>`;
    element.html(question);
    answerCounter.html(answerBox);
    correctCounter.html(correctBox);
  }

// console.log('quiz', selectAnswer(0), quiz.userAnswer);
selectAnswer(1);
console.log(nextQuestion());
selectAnswer(0);
// questionsIdIteration();
console.log(nextQuestion());
console.log(quiz.userAnswer);

//////////////////RUN ON LOAD OF PAGE///////////////////
//After submit
  //The value of the answer is pushed to userAnswers
  //The correct answer to be green
    //use filter to addClass (css of font-color green)
  //The wrong answers to be red (DO THIS FIRST)
    //use map to addClass (css of font-color red)
  //Put conditional statement -- goes into div #js-feedback
    //if the index of the correctanswer equals the user answer then we say
      //Correct!
    //else we say Incorrect
//Update Answered so far
//Update Correct so far
//Pop up next question button

$(function(){

render();

$('form#js-current-question').submit((event)=>{ //if you run into issues, change .submit to .on(submit)
  event.preventDefault();
  let checkedVal = $('input[name="Answers"]:checked').val();
  selectAnswer(checkedVal);
  let correctAnsIndex = quiz.questions[idNumber].correctAnswer;
  let correctAnsVal = quiz.questions[idNumber].answer[correctAnsIndex];
  correctAnswerChecker(checkedVal, correctAnsVal);
  //pop up window (alert?) that says 'Correct' 
//   console.log(quiz.userAnswer);
//   console.log(quiz.correctAnswers);

questionsIdIteration();
nextQuestion();
render();

  console.log(quiz.userAnswer);
  console.log(quiz.correctAnswers);

})

    
})

