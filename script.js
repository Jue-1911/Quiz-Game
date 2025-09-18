// Quiz Game JavaScript

// DOM Elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const timeRemainingElement = document.getElementById('time-remaining');
const finalScoreElement = document.getElementById('final-score');
const maxScoreElement = document.getElementById('max-score');
const resultMessageElement = document.getElementById('result-message');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 60;
let selectedAnswer = null;

// Quiz Questions - Beginner Level with Computer Basics and OS Knowledge
const quizQuestions = [
    // Computer Basics Questions
    {
        question: "What is the main function of a CPU?",
        answers: [
            "To process data and execute instructions",
            "To store data permanently",
            "To connect to the internet",
            "To display graphics on the screen"
        ],
        correctAnswer: 0
    },
    {
        question: "Which of these is an input device?",
        answers: [
            "Printer",
            "Monitor",
            "Keyboard",
            "Speaker"
        ],
        correctAnswer: 2
    },
    {
        question: "What does RAM stand for?",
        answers: [
            "Random Access Memory",
            "Read Access Module",
            "Remote Access Machine",
            "Runtime Application Memory"
        ],
        correctAnswer: 0
    },
    {
        question: "Which unit is used to measure computer processor speed?",
        answers: [
            "Megabyte (MB)",
            "Gigahertz (GHz)",
            "Pixel",
            "Decibel (dB)"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the function of a computer's motherboard?",
        answers: [
            "To store data permanently",
            "To connect all components of a computer",
            "To display images",
            "To connect to the internet"
        ],
        correctAnswer: 1
    },
    // Operating System Questions
    {
        question: "What is an operating system?",
        answers: [
            "A type of computer hardware",
            "Software that manages computer hardware and software resources",
            "A programming language",
            "A type of computer virus"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of these is NOT an operating system?",
        answers: [
            "Windows",
            "macOS",
            "Excel",
            "Linux"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the main function of a file system in an operating system?",
        answers: [
            "To organize and store files",
            "To connect to the internet",
            "To display graphics",
            "To run applications"
        ],
        correctAnswer: 0
    },
    {
        question: "Which key combination is commonly used to copy selected items in Windows?",
        answers: [
            "Ctrl+X",
            "Ctrl+V",
            "Ctrl+C",
            "Ctrl+Z"
        ],
        correctAnswer: 2
    },
    {
        question: "What is a computer virus?",
        answers: [
            "A hardware component",
            "A malicious software program",
            "A type of computer memory",
            "An operating system feature"
        ],
        correctAnswer: 1
    },
    // Basic Developer Knowledge
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 2
    },
    {
        question: "Which symbol is used to start a comment in HTML?",
        answers: [
            "//",
            "/* */",
            "#",
            "<!--"
        ],
        correctAnswer: 3
    },
    {
        question: "What is the correct file extension for a web page?",
        answers: [
            ".doc",
            ".html",
            ".jpg",
            ".exe"
        ],
        correctAnswer: 1
    },
    {
        question: "What does URL stand for?",
        answers: [
            "Universal Resource Locator",
            "Uniform Resource Locator",
            "United Resource Link",
            "Universal Reference Link"
        ],
        correctAnswer: 1
    }
];

// Initialize the quiz
function initQuiz() {
    // Set total questions
    totalQuestionsElement.textContent = quizQuestions.length;
    maxScoreElement.textContent = quizQuestions.length;
    
    // Add event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    startTimer();
}

// Load a question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Update question counter
    currentQuestionElement.textContent = currentQuestionIndex + 1;
    
    // Clear previous answers and feedback
    answersContainer.innerHTML = '';
    feedbackElement.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Create answer options
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer-option');
        answerElement.textContent = answer;
        answerElement.dataset.index = index;
        
        answerElement.addEventListener('click', () => selectAnswer(index));
        
        answersContainer.appendChild(answerElement);
    });
}

// Select an answer
function selectAnswer(index) {
    // Clear previous selection
    const answerElements = document.querySelectorAll('.answer-option');
    answerElements.forEach(element => {
        element.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected answer
    const selectedElement = answerElements[index];
    selectedElement.classList.add('selected');
    
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = index === question.correctAnswer;
    
    // Show feedback
    feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
    feedbackElement.className = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
    feedbackElement.classList.remove('hidden');
    
    // Update score if correct
    if (isCorrect) {
        score++;
    }
    
    // Mark correct and incorrect answers
    selectedElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
        answerElements[question.correctAnswer].classList.add('correct');
    }
    
    // Disable further selections
    answerElements.forEach(element => {
        element.style.pointerEvents = 'none';
    });
    
    // Show next button
    nextBtn.classList.remove('hidden');
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Start the timer
function startTimer() {
    timeRemaining = 180; // Extended time for beginners
    timeRemainingElement.textContent = timeRemaining;
    
    timer = setInterval(() => {
        timeRemaining--;
        timeRemainingElement.textContent = timeRemaining;
        
        if (timeRemaining <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    clearInterval(timer);
    questionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    finalScoreElement.textContent = score;
    
    // Generate result message
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Perfect! You have excellent computer knowledge!';
    } else if (percentage >= 80) {
        message = 'Great job! You have a solid understanding of computer basics!';
    } else if (percentage >= 60) {
        message = 'Good effort! You\'re on your way to understanding computers better!';
    } else if (percentage >= 40) {
        message = 'Not bad for a beginner! Keep learning and you\'ll improve!';
    } else {
        message = 'This is just the beginning of your learning journey! Keep practicing!';
    }
    
    resultMessageElement.textContent = message;
}

// Restart the quiz
function restartQuiz() {
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', initQuiz);