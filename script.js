// questions 배열 — 쉼표 빠진 부분 고침
const questions = [
  "1. 최근 2주 동안<br>기분이 가라앉거나, 우울하거나, 희망이 없다고 느끼셨나요?",
  "2. 최근 2주 동안<br>평소 하던 일에 대한 흥미가 없어지거나, 즐거움을 느끼지 못하셨나요?",
  "3. 최근 2주 동안<br>잠들기가 어렵거나<br>자주 깨셨나요?<br>혹은 너무 많이 주무셨나요?",
  "4. 최근 2주 동안<br>평소보다 식욕이 줄거나, 평소보다 많이 드셨나요?",
  "5. 최근 2주 동안<br>다른 사람들이 눈치 챌 정도로 말과 행동이 느려지거나,<br>안절부절 못하셨나요?",
  "6. 최근 2주 동안<br>피곤하고 기운이 없다고 느끼셨나요?",
  "7. 최근 2주 동안<br>내가 잘못했거나 실패했다는 생각이 드셨나요?<br>혹은 가족을 실망시켰다고 느끼셨나요?",
  "8. 최근 2주 동안<br>신문을 읽거나 TV를 보는 등 일상적인 일에도 집중하기 어려우셨나요?",
  "9. 최근 2주 동안<br>차라리 죽는 것이 낫겠다고 생각하셨거나 자해할 생각이 드셨나요?"
];

const options = [
  { text: "없음", value: 0 },
  { text: "2-6일", value: 1 },
  { text: "7-12일", value: 2 },
  { text: "거의 매일", value: 3 }
];

let current = 0;
let score = 0;

// DOM 요소 — id 이름이 HTML과 일치하는지 다시 한 번 확인하세요
const startBtn = document.getElementById("start-btn");   // HTML에 id="start-btn" 있어야 함
const nextBtn = document.getElementById("next-btn");     // id="next-btn"
const restartBtn = document.getElementById("restart-btn"); // id="restart-btn"
const quiz = document.getElementById("quiz");            // id="quiz"
const result = document.getElementById("result");        // id="result"
const container = document.querySelector(".container");
const questionEl = document.getElementById("question");  // id="question"
const optionsEl = document.getElementById("options");    // id="options"
const resultTitle = document.getElementById("result-title") || document.getElementById("resultTitle"); // 허용형
const resultTextEl = document.getElementById("resultText") || document.getElementById("result-text"); // 결과 텍스트 p

// 안전 체크: 필수 요소가 없는 경우 콘솔에 알려줌
if (!startBtn || !nextBtn || !questionEl || !optionsEl || !quiz || !result || !resultTextEl) {
  console.error("필수 요소가 없습니다. HTML의 id가 JS와 일치하는지 확인하세요.");
}

// 이벤트 연결
startBtn && startBtn.addEventListener("click", startQuiz);
nextBtn && nextBtn.addEventListener("click", nextQuestion);
restartBtn && restartBtn.addEventListener("click", () => location.reload());

function startQuiz() {
  // 시작 시 변수 초기화 (재진입 대비)
  current = 0;
  score = 0;
  container.classList.add("hidden");
  quiz.classList.remove("hidden");
  nextBtn.classList.add("hidden"); // 선택 전에는 다음 버튼 숨기기
  showQuestion();
}

function showQuestion() {
  questionEl.innerHTML = questions[current]; // 질문은 그대로
  questionEl.classList.remove("small-question"); // 이전 클래스 제거
  if (current === 4 || current === 6) { 
    questionEl.classList.add("small-question"); // 5,7번만 클래스 추가
  }

  optionsEl.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt.text;
    btn.style.fontSize = "1.1rem"; // 선택지는 항상 1rem
    btn.addEventListener("click", () => selectOption(opt.value));
    optionsEl.appendChild(btn);
  });
}

function selectOption(value) {
  score += value;
  // 사용자가 선택하면 다음으로 진행할 수 있게 만듬
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  // 다음 누르면 다음 문제로
  current++;
  nextBtn.classList.add("hidden");
  if (current < questions.length) {
    showQuestion();
  } else {
    renderResult();
  }
}

function renderResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

// ✅ 시작 화면 완전히 숨기기
  const startScreen = document.querySelector(".container");
  if (startScreen) startScreen.classList.add("hidden");
  
  // 결과 텍스트 결정
  let title = "";
  let message = "";

  if (score <= 4) {
    title = "💙 정상";
    message = "현재의 마음 상태는 안정적이에요.<br>잘하고 계세요.";
  } else if (score <= 9) {
    title = "🌥️ 가벼운 우울";
    message = "잠시 멈추고 자신에게 다정해질 시간을 가져보세요.";
  } else if (score <= 19) {
    title = "☁️ 중간 정도의 우울감";
    message = "당신의 마음이 많이 지쳐있어요.<br>믿을 수 있는 사람과 대화를 나눠보세요.";
  } else {
    title = "💧 높은 우울감";
    message = `
      <div style="text-align: center;">전문의와의 상담이 필요합니다.</div>
      <div style="text-align: left;">
        <div style="text-align: center; font-weight: bold; margin-top: 8px;">광주전남 전문기관</div>
        자살예방상담 109<br>
        정신건강상담 1577-0199<br>
        청소년전화 1388<br>
        한국생명의전화 1588-9191
      </div>
      <div style="text-align: center; margin-top: 8px;">
        망설이지 말고 연락하세요.<br>당신은 혼자가 아닙니다.
      </div>
    `;
  }

  if (resultTitle) 
 resultTitle.innerHTML = `<strong>${score}점<br></strong> ${title}`;
  resultTextEl.innerHTML = message;

  const credit = document.getElementById("credit");
  if (credit) credit.classList.remove("hidden");
}
