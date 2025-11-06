const questions = [
  "기분이 가라앉거나, 우울하거나, 희망이 없다고 느끼셨나요?",
  "평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못하셨나요?",
  "잠들기가 어렵거나 자주 깨셨나요? 혹은 너무 많이 주무셨나요?",
  "평소보다 식욕이 줄거나, 평소보다 많이 드셨나요?",
  "다른 사람들이 눈치 챌 정도로 말과 행동이 느려지거나, 너무 안절부절 못하셨나요?",
  "피곤하고 기운이 없다고 느끼셨나요?",
  "내가 잘못했거나 실패했다는 생각이 드셨나요? 혹은 가족을 실망시켰다고 느끼셨나요?",
  "신문을 읽거나 TV를 보는 등 일상적인 일에도 집중하기 어려우셨나요?",
  "차라리 죽는 것이 낫겠다고 생각하셨거나 자해할 생각이 드셨나요?"
];

const options = [
  { text: "없음", value: 0 },
  { text: "2-6일", value: 1 },
  { text: "7-12일", value: 2 },
  { text: "거의 매일", value: 3 }
];

let current = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const container = document.querySelector(".container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => location.reload());

function startQuiz() {
  container.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  questionEl.textContent = questions[current];
  optionsEl.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.addEventListener("click", () => selectOption(opt.value));
    optionsEl.appendChild(btn);
  });
}

function selectOption(value) {
  score += value;
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  current++;
  nextBtn.classList.add("hidden");

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  if (score <= 4) {
    resultTitle.textContent = "💙 우울증이 없는 상태예요.";
    resultText.textContent = "현재의 마음 상태는 안정적이에요. 잘하고 계세요.";
  } else if (score <= 9) {
    resultTitle.textContent = "🌤 가벼운 우울감이 느껴지네요.";
    resultText.textContent = "잠시 멈추고 자신에게 다정해질 시간을 가져보세요.";
  } else if (score <= 19) {
    resultTitle.textContent = "☁️ 중간 정도의 우울감을 느끼고 계세요.";
    resultText.textContent = "당신의 마음이 꽤 지쳐있어요. 믿을 수 있는 사람과 대화를 나눠보세요.";
  } else {
    resultTitle.textContent = "💔 심한 우울증 상태일 수 있어요.";
    resultText.innerHTML = `
      당신의 마음이 많이 지쳐있어요.<br>혼자가 아닙니다.<br>
      지금 바로 전문기관과 연결해드릴게요.<br>
      자살예방상담 109<br>정신건강상담 1577-0199<br>
      청소년전화 1388<br>한국생명의전화 1588-9191
    `;
  }
}
