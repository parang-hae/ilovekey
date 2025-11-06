const questions = [
    "기분이 가라앉거나, 우울하거나, 희망이 없다고 느끼셨나요?",
    "평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못하셨나요?",
    "잠들기가 어렵거나 자주 깨셨나요, 혹은 너무 많이 주무셨나요?",
    "평소보다 식욕이 줄었거나, 평소보다 많이 드셨나요?",
    "다른 사람들이 눈치 챌 정도로 평소보다 말과 행동이 느려지셨나요, 혹은 너무 안절부절못하셨나요?",
    "피곤하고 기운이 없으셨나요?",
    "내가 잘못했거나 실패했다는 생각이 들었나요, 혹은 자신과 가족을 실망시켰다고 느끼셨나요?",
    "신문이나 TV 등 일상적인 일에도 집중하기 어려우셨나요?",
    "차라리 죽는 것이 더 낫겠다고 생각하셨나요, 혹은 자해할 생각을 하셨나요?"
];

const options = ["없음", "2-6일", "7-12일", "거의 매일"];
const scores = [0, 1, 2, 3];

let currentQuestion = 0;
let totalScore = 0;

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    quizDiv.classList.remove("hidden");
    quizDiv.innerHTML = `
        <h2>${questions[currentQuestion]}</h2>
        ${options.map((opt, i) => `<button onclick="selectOption(${i})">${opt}</button>`).join("")}
    `;
}

function selectOption(index) {
    totalScore += scores[index];
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizDiv.classList.add("hidden");
    resultDiv.classList.remove("hidden");

    let message = "";
    if (totalScore <= 4) {
        message = "🌼 당신의 마음은 안정적인 상태입니다. 일상의 균형을 잘 유지하고 계시네요.";
    } else if (totalScore <= 9) {
        message = "🌷 조금 지친 마음이 느껴집니다. 잠시 멈추고 자신을 돌보는 시간을 가져보세요.";
    } else if (totalScore <= 19) {
        message = "🌧️ 마음이 무겁게 느껴질 때가 있으신가요? 가까운 사람과 대화를 나눠보세요.";
    } else {
        message = "💔 당신의 마음이 많이 지쳐있어요. 혼자가 아닙니다.<br>지금 바로 전문기관과 연결해드릴게요.<br><br>자살예방 상담전화 109<br>정신건강 상담전화 1577-0199<br>청소년전화 1388<br>한국생명의전화 1588-9191";
    }

    resultDiv.innerHTML = `
        <h2>💙 마음진단 결과</h2>
        <p>${message}</p>
        <p class="note">본 자가검진은 정확한 진단을 내리기에는 어려움이 있으므로, 정확한 판단을 위해서는 전문의의 진료가 필요합니다.</p>
        <p class="source">출처: 박승진 외(2010), 한글판 우울증선별도구(PHQ-9)</p>
    `;
}
