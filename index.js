import jikoMember from "./jikoMembers.js";
const nextButton = document.querySelector(".btn-next");
const answerContainer = document.querySelector(".answers");
const currentScore = document.querySelector("#current-score");

document.querySelector("button").addEventListener("click", handleButtonClick);

function handleButtonClick() {
  const slide = document.querySelector(".slide-quiz");
  moveSlideToLeft(slide);

  setTimeout(() => {
    const quizContainer = document.querySelector(".quiz");
    showQuizContainer(quizContainer);
  }, 1000);
}

function moveSlideToLeft(slide) {
  slide.style.left = 0;
}

function showQuizContainer(quizContainer) {
  quizContainer.style.opacity = "1";
  quizContainer.style.transition = "opacity 1s ease 0s";
}

let questionIndex = 0;
let score = 0;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  currentScore.innerHTML = score;
  showQuestionsAnwers();
}

function showQuestionsAnwers() {
  createElementQuestions();
  createElementAnswers();
}

function createElementQuestions() {
  const questionContainer = document.querySelector(".jiko-question");
  const currentQuestion = jikoMember[questionIndex];
  questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;
}

function createElementAnswers() {
  resetState();
  const currentAnswer = jikoMember[questionIndex];
  currentAnswer.answers.forEach((item) => {
    const answerElements = document.createElement("button");
    answerElements.classList.add("answer");
    answerElements.innerText = item.answer;
    answerContainer.appendChild(answerElements);

    nextButton.disabled = true;

    answerElements.addEventListener("click", () => {
      if (item.correct == true) {
        answerElements.classList.add("correct");
        updateScore();
      } else {
        answerElements.classList.add("incorrect");
      }
      Array.from(answerContainer.children).forEach((answer) => {
        answer.disabled = true;
      });

      nextButton.disabled = false;
      nextButton.style.color = "white";
      nextButton.style.backgroundColor = "black";
    });
  });
}

function updateScore() {
  score++;
  currentScore.innerHTML = score;
}

function resetState() {
  nextButton.style.color = "#999595";
  nextButton.style.backgroundColor = "rgb(223, 223, 223)";

  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

nextButton.addEventListener("click", handleNextBtn);

function handleNextBtn() {
  questionIndex++;
  if (questionIndex < jikoMember.length) {
    showQuestionsAnwers();
  } else {
    startQuiz();
  }
}
startQuiz();
