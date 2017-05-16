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

  userAnswer: [], ///////////REVISIT THIS TO REWORK AS AN ARRAY OF NUMBERS LISTING THE ANSWER CHOICES
  correctAnswers: [],
  currentQuestion: null,
  idNumber: 0,
}

//////////////////////////MOD FUNCTIONS//////////////////////////////////

  function selectAnswer(state, answer){
   state.userAnswer.push(answer);
  }

  //Note to come back to this and put it in the state(currentQuestion)
  function questionsIdIteration(state){
      state.idNumber++;                  //////////////////////////////////FIX ALL IDNUMBERS
      return state.idNumber;
  }

  //Note to come back and combine questionsIDIteration and nextQuestion

  function nextQuestion(state) {    
    if(state.idNumber === 3) {
      console.assert('quiz done');
      // call a function, maybe,to dispaly ansers or ....
    } else {
      console.assert('quiz not done, next question. Please');
      return state.questions[state.idNumber].question;
    }
     
  }

  function correctAnswerChecker(state, userAnswer, correctAnswer) {
    if(userAnswer === correctAnswer) {
        state.correctAnswers.push(userAnswer);
        return true;
    } else {
      return false;
    }
  }

  const render = (element = $('div#js-question'), 
                answerCounter = $('div.js-answer-counter'),
                 correctCounter = $('div.js-correct-counter'), 
                 state = quiz)=>{

      const path= state.questions[state.idNumber].answer;
      const numberOfQuestions = quiz.questions.length;
      const numberOfCorrectQuestions = quiz.correctAnswers.length;//LOOKIE HERE NAEEM!!!
      const answerBox = `<p>Answered so far: ${state.idNumber}/${numberOfQuestions}</p>`;
      const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
      const question =  
        ` <ul>
          <li>${state.questions[state.idNumber].question}</li>
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




///////////////////////////////////RENDER COUNTER//////////////////////////////////////////////////



  const renderCounters = (state, answerCounter = $('div.js-answer-counter'),
                 correctCounter = $('div.js-correct-counter'), checkedVal = $('input[name="Answers"]:checked').val()
                 ) => {
    const numberOfQuestions = state.questions.length;
    const numberOfCorrectQuestions = state.correctAnswers.length;
    const answerBox = `<p>Answered so far: ${state.idNumber}/${numberOfQuestions}</p>`;
    const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
console.log(state.idNumber);
     let correctAnsIndex = state.questions[state.idNumber].correctAnswer;
     let correctAnsVal = state.questions[state.idNumber].answer[correctAnsIndex];
     console.log('THIS IS INDEX', correctAnsIndex)
    

      let answer = correctAnswerChecker(quiz, checkedVal, correctAnsVal);
      if(answer === true) {
        $('#js-feedback').append(`<p><strong>Correct</strong></p>`);
      } else {
        $('#js-feedback').append(`<p><strong>Incorrect</strong></p>`);
      }

    $('#js-current-question').find('> p').addClass('red');
    $('#js-current-question p').eq(correctAnsIndex).addClass('green');
    //.css('color', 'green');//this also works when replacing addClass on line 135
    // console.log($('form#js-current-question p').eq(correctAnsIndex).text());
    $('#js-current-question').find('button').addClass('hidden');


    $('#js-feedback').append(`<form id="js-next"><button type='submit'>Next Question</button></form>`);
    questionsIdIteration(quiz);
    answerCounter.html(answerBox);   
    correctCounter.html(correctBox);
  }


// console.log('quiz', selectAnswer(0), quiz.userAnswer);
// selectAnswer(1);
// console.log(nextQuestion());
// selectAnswer(0);
// // questionsIdIteration();
// console.log(nextQuestion());
// console.log(quiz.userAnswer);

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

///////////////////SUBMIT EVENT LISTENER/////////////////////////
    $('#js-question').on('submit', '#js-current-question', event =>{ //if you run into issues, change .submit to .on(submit)
      event.preventDefault();
      let checkedVal = $('input[name="Answers"]:checked').val();
      selectAnswer(quiz, checkedVal);
    // const numberOfQuestions = quiz.questions.length;
    // const numberOfCorrectQuestions = quiz.correctAnswers.length;
    // const answerBox = `<p>Answered so far: ${idNumber}/${numberOfQuestions}</p>`;
    // const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
    // $('div.js-answer-counter').html(answerBox);
    // $('div.js-correct-counter').html(correctBox);

    renderCounters(quiz);

      //pop up window (alert?) that says 'Correct' 
    //   console.log(quiz.userAnswer);
    //   console.log(quiz.correctAnswers);
      console.log(quiz.correctAnswers);

    // questionsIdIteration();
    // nextQuestion();
    // render();
    });

///////////////////NEXT QUESTION EVENT LISTENER/////////////////////////
    $('#js-feedback').on('submit', '#js-next', (event) => {
      event.preventDefault();
      
      console.log('that', quiz.idNumber);
      console.log(quiz.questions.length);
      if(quiz.idNumber !== quiz.questions.length) {
          console.log('quiz not done, next question. Please');
          nextQuestion(quiz);
          render();
        } else {
          console.log('quiz done');
          // call a function, maybe,to display ansers or ....
          // when done , can do a .remove() on js-feedback. and count right answers.
        }
      
      $('#js-feedback').html('');
    });


///////////////////////////////////LAST PAGE (OUTRO)////////////////////////////
    
})

