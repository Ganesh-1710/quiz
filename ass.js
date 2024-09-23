// script.js
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let timeLimit = 30; // 30 seconds
let timerInterval;

// Quiz Creator
document.getElementById('add-question').addEventListener('click', addQuestion);

function addQuestion() {
    const question = document.getElementById('question').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctAnswer = document.getElementById('correct-answer').value;

    const quizQuestion = {
        question,
        options: [option1, option2, option3, option4],
        correctAnswer
    };

    quizQuestions.push(quizQuestion);

    document.getElementById('quiz-questions').innerHTML += `
        <li>
            ${question}
        </li>
    `;

    document.getElementById('question').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
    document.getElementById('option3').value = '';
    document.getElementById('option4').value = '';
    document.getElementById('correct-answer').value = '';
}

// Quiz Taker
document.getElementById('start-quiz').addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').innerHTML = `
        <p id="question-text">${quizQuestions[currentQuestion].question}</p>
        <ul id="options"></ul>
        <button id="submit-answer">Submit Answer</button>
        <p id="result"></p>
        <p id="timer">Time: ${timeLimit} seconds</p>
    `;

    const options = quizQuestions[currentQuestion].options;
    for (let i = 0; i < options.length; i++) {
        document.getElementById('options').innerHTML += `
            <li>
                <input type="radio" name="option" value="${options[i]}">${options[i]}
            </li>
        `;
    }

    timerInterval = setInterval(() => {
        timeLimit--;
        document.getElementById('timer').innerHTML = `Time: ${timeLimit} seconds`;
        if (timeLimit === 0) {
            clearInterval(timerInterval);
            submitAnswer();
        }
    }, 1000);

    document.getElementById('submit-answer').addEventListener('click', submitAnswer);
}

function submitAnswer() {
    clearInterval(timerInterval);
    const userAnswer = document.querySelector('input[name="option"]:checked').value;
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (userAnswer === correctAnswer)
        score++;
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        document.getElementById('quiz-container').innerHTML = `
            <p id="question-text">${quizQuestions[currentQuestion].question}</p>
            <ul id="options"></ul>
            <button id="submit-answer">Submit Answer</button>
            <p id="result"></p>
            <p id="timer">Time: ${timeLimit} seconds</p>
        `;

        const options = quizQuestions[currentQuestion].options;
        for (let i = 0; i < options.length; i++) {
            document.getElementById('options').innerHTML += `
                <li>
                    <input type="radio" name="option" value="${options[i]}">${options[i]}
                </li>
            `;
        }

        timerInterval = setInterval(() => {
            timeLimit--;
            document.getElementById('timer').innerHTML = `Time: ${timeLimit} seconds`;
            if (timeLimit === 0) {
                clearInterval(timerInterval);
                submitAnswer();
            }
        }, 1000);
    } else {
        document.getElementById('quiz-container').innerHTML = `
            <p id="result">Your score is ${score} out of ${quizQuestions.length}.</p>
        `;
    }
}