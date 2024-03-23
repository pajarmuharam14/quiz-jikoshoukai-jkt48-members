import jikoMember from "./jikoMembers.js";
const nextButton = document.querySelector(".btn-next");
const answerContainer = document.querySelector(".answers");
const scoreElement = document.querySelector(".score");
const currentScore = document.querySelector("#current-score");
const questionContainer = document.querySelector(".jiko-question");

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
  scoreElement.style.display = "block";
  nextButton.innerHTML = "Next";
  showQuestionsAnwers();
}

function shuffleListQuestion(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestionsAnwers() {
  shuffleListQuestion(jikoMember);
  createElementQuestionsAnswers();
}

function createElementQuestionsAnswers() {
  if (jikoMember.length === 0) {
    shuffleListQuestion(jikoMember);
  }

  const questionsAnswers = jikoMember.pop();
  questionContainer.innerHTML = `<p>${questionsAnswers.question}</p>`;

  resetState();

  questionsAnswers.answers.forEach((item) => {
    const answerElements = createAnswerELements(item);
    answerContainer.appendChild(answerElements);

    nextButton.disabled = true;

    answerElements.addEventListener("click", () => {
      handleClickAnswer(item, answerElements);
    });
  });
}

function createAnswerELements(item) {
  const answerBtns = document.createElement("button");
  answerBtns.classList.add("answer");
  answerBtns.innerText = item.answer;
  return answerBtns;
}

function handleClickAnswer(item, el) {
  if (item.correct == true) {
    el.classList.add("correct");
    updateScore();
  } else {
    el.classList.add("incorrect");
  }

  Array.from(answerContainer.children).forEach((answer) => {
    answer.disabled = true;
  });

  nextButton.disabled = false;
  nextButton.style.color = "white";
  nextButton.style.backgroundColor = "black";
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

function showResult() {
  resetState();
  questionContainer.innerHTML = `Your scored ${score}`;
  questionContainer.style.fontSize = "24px";
  scoreElement.style.display = "none";
  nextButton.innerText = "Play again";
  nextButton.style.color = "white";
  nextButton.style.backgroundColor = "black";
}

function handleNextBtn() {
  questionIndex++;
  if (questionIndex < 10) {
    showQuestionsAnwers();
  } else {
    showResult();
  }
}

nextButton.addEventListener("click", () => {
  if (questionIndex < 10) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
