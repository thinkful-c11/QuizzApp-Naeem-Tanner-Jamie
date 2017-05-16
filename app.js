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
   quiz.userAnswer.push(answer);
  }

  let idNumber = 0;
  //Note to come back to this and put it in the state(currentQuestion)
  function questionsIdIteration(){
      idNumber++;
      return idNumber;
  }

  //Note to come back and combine questionsIDIteration and nextQuestion

  function nextQuestion() {    
    if(idNumber === 3) {
      console.assert('quiz done');
      // call a function, maybe,to dispaly ansers or ....
    } else {
      console.assert('quiz not done, next question. Please');
      return quiz.questions[idNumber].question;
    }
     
  }

  function correctAnswerChecker(userAnswer, correctAnswer) {
    if(userAnswer === correctAnswer) {
        quiz.correctAnswers.push(userAnswer);
        return true;
    } else {
      return false;
    }
  }

  const render = (element = $('div#js-question'), 
                answerCounter = $('div.js-answer-counter'),
                 correctCounter = $('div.js-correct-counter'), 
                 state = quiz)=>{
      const path= state.questions[idNumber].answer;
      const numberOfQuestions = quiz.questions.length;
      const numberOfCorrectQuestions = quiz.correctAnswers.length;//LOOKIE HERE NAEEM!!!
      const answerBox = `<p>Answered so far: ${idNumber}/${numberOfQuestions}</p>`;
      const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
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

  const renderCounters = (answerCounter = $('div.js-answer-counter'),
                 correctCounter = $('div.js-correct-counter'), 
                 state = quiz) => {
    const numberOfQuestions = state.questions.length;
    const numberOfCorrectQuestions = state.correctAnswers.length;
    const answerBox = `<p>Answered so far: ${idNumber}/${numberOfQuestions}</p>`;
    const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
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
    $('#js-question').on('submit', '#js-current-question', (event)=>{ //if you run into issues, change .submit to .on(submit)
      event.preventDefault();
      let checkedVal = $('input[name="Answers"]:checked').val();
      selectAnswer(checkedVal);

      let correctAnsIndex = quiz.questions[idNumber].correctAnswer;
      let correctAnsVal = quiz.questions[idNumber].answer[correctAnsIndex];
      console.log(checkedVal + ', ' + correctAnsVal);
      //I don't know why it's pushing the checkedVal twice into the correctAnswers

      var answer = correctAnswerChecker(checkedVal, correctAnsVal);
      // console.info('answer ' , answer);
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

    questionsIdIteration();
    // const numberOfQuestions = quiz.questions.length;
    // const numberOfCorrectQuestions = quiz.correctAnswers.length;
    // const answerBox = `<p>Answered so far: ${idNumber}/${numberOfQuestions}</p>`;
    // const correctBox = `<p>Correct so far: ${numberOfCorrectQuestions}/${numberOfQuestions}</p>`;
    // $('div.js-answer-counter').html(answerBox);
    // $('div.js-correct-counter').html(correctBox);

    renderCounters();


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
      // var idCheck = questionsIdIteration();
      console.log(idNumber);
      console.log(quiz.questions.length);
      if(idNumber !== quiz.questions.length) {
          console.log('quiz not done, next question. Please');
          nextQuestion();
          render();
        } else {
          console.log('quiz done');
          // call a function, maybe,to display ansers or ....
          // when done , can do a .remove() on js-feedback. and count right answers.
        }
      
      $('#js-feedback').html('');
    });

    
})

