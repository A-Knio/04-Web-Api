let currentQuestionIndex = 0;
let time = 60;
let timerId;

const questions = [
    {
        question: "what is the capital of France?",
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'New York', correct: false },
            { text: 'Berlin', correct: false }
        ],
        correctAnswer: 0
    },
    {
        question: "what is the capital of Germany?",
        answers: [
            { text: 'Paris', correct: false },
            { text: 'London', correct: false },
            { text: 'New York', correct: false },
            { text: 'Berlin', correct: true }
        ],
        correctAnswer: 1
    },
    {
        question: '"what is the capital of England?',
        answers: [
            { text: 'Paris', correct: false },
            { text: 'London', correct: true },
            { text: 'New York', correct: false },
            { text: 'Berlin', correct: false }
        ],
        correctAnswer: 2
    },
    {
        question: "what is the capital of the United States?",
        answers: [
            { text: 'Paris', correct: false },
            { text: 'London', correct: false },
            { text: 'New York', correct: false },
            { text: 'Washington D.C.', correct: true }
        ],
        correctAnswer: 3
    },
    {
        question: "what is the capital of the Japan?",
        answers: [
            { text: 'Tokyo', correct: true },
            { text: 'London', correct: false },
            { text: 'New York', correct: false },
            { text: 'Berlin', correct: false }
        ],
        correctAnswer: 0
    },

   
];

const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('quiz-question');
const questionElement = document.getElementById('question');
const answerButtons = Array.from(document.getElementsByClassName('answer-btn'));
const quizOverContainer = document.getElementById('quiz-over');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score-btn');
const timeLeftDisplay = document.getElementById('time-left');

startButton.addEventListener('click', startQuiz);
answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleAnswer(index);
    });
});
saveScoreButton.addEventListener('click', saveScore);

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    timerId = setInterval(updateTime, 1000);
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer.text; 
    });
}

function handleAnswer(index) {
    if (index === questions[currentQuestionIndex].correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    
    }
}

function updateTime() {
    time--;
    timeLeftDisplay.innerText = time;
    if (time <= 0) {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerId);
    questionContainer.classList.add('hide');
    quizOverContainer.classList.remove('hide');
    scoreElement.innerText = 'Your score: ' + time;
}

function saveScore() {
    const initials = initialsInput.value;
    const score = time;

    console.log('Initials:', initials, 'Score:', score);
}

const resetButton = document.getElementById('reset-btn');

resetButton.addEventListener('click', resetQuiz);

function resetQuiz() {

    currentQuestionIndex = 0;
    time = 60;

    
    quizOverContainer.classList.add('hide');
    resetButton.classList.add('hide');
    startButton.classList.remove('hide');

    
    initialsInput.value = '';
    scoreElement.innerText = '';

    
    timeLeftDisplay.innerText = '60';
}