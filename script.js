// Simple MBTI-style self-check demo (no backend). Answers are stored locally in the browser.
const questions = [
  {q:"최근 2주간 기분이 우울하거나 슬펐던 적이 있나요?", a:["전혀 그렇지 않다","가끔 그렇다","자주 그렇다"]},
  {q:"예전보다 흥미나 즐거움이 많이 줄었나요?", a:["아니다","조금 줄었다","매우 줄었다"]},
  {q:"잠이 잘 오지 않거나 과도하게 잠을 자나요?", a:["전혀 아니다","가끔 그렇다","매우 그렇다"]},
  {q:"식욕이 줄거나 늘어났나요?", a:["전혀 아니다","조금 변했다","현저히 변했다"]},
  {q:"일상생활을 유지하는 데 어려움이 있나요?", a:["아니다","약간 불편하다","매우 어렵다"]},
  {q:"최근 평소보다 짜증이 많아졌나요?", a:["아니다","가끔 있다","자주 있다"]},
  {q:"자신을 부정적으로 바라보는 생각이 늘었나요?", a:["아니다","가끔 있다","자주 있다"]},
  {q:"요즘 활동하기가 너무 귀찮아서 거의 하지 않나요?", a:["아니다","가끔 그렇다","자주 그렇다"]}
];

// scoring: option 0 -> 0, option1 ->1, option2 ->2
const qContainer = document.getElementById('q-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultSection = document.getElementById('result');
const resultText = document.getElementById('resultText');
const resourceDiv = document.getElementById('resource');
const restartBtn = document.getElementById('restartBtn');

let current = 0;
let answers = new Array(questions.length).fill(null);

function renderQuestion(idx){
  const item = questions[idx];
  qContainer.innerHTML = `
    <div class="question">
      <div class="q-title">Q${idx+1}. ${item.q}</div>
      <div class="options" id="opts"></div>
    </div>`;
  const opts = document.getElementById('opts');
  item.a.forEach((text, i) => {
    const div = document.createElement('div');
    div.className='option'+(answers[idx]===i?' selected':'');
    div.innerText = text;
    div.addEventListener('click', ()=>{
      answers[idx]=i;
      // mark selected
      Array.from(opts.children).forEach((c,ci)=> c.classList.toggle('selected', ci===i));
      // auto-advance after slight delay (for mobile feel)
      setTimeout(()=>{
        if(current < questions.length-1) showNext();
        else showResult();
      }, 220);
    });
    opts.appendChild(div);
  });
  prevBtn.disabled = idx===0;
  nextBtn.disabled = false;
}

function showNext(){
  if(answers[current]===null){
    // if not answered, require selection (or allow skip and move on)
    // We'll allow move but encourage answer.
    if(!confirm('아직 문항을 선택하지 않으셨습니다. 다음으로 넘어가시겠습니까?')) return;
  }
  if(current < questions.length-1){
    current++;
    renderQuestion(current);
  } else {
    showResult();
  }
}
function showPrev(){
  if(current>0){ current--; renderQuestion(current); }
}

function showResult(){
  // compute score
  let score = answers.reduce((s,v)=> s + (v===null?0:v), 0);
  // clear unanswered? treat null as 0
  let label = "";
  let advice = "";
  if(score <= 4){
    label = "현재 큰 우려는 보이지 않습니다.";
    advice = "현재로서는 가벼운 스트레스 수준으로 보입니다. 자기관리(수면, 식사, 운동)를 권장합니다.";
  } else if(score <= 9){
    label = "주의가 필요한 수준입니다.";
    advice = "기분 변화가 지속된다면 전문 상담을 검토하세요. 가까운 상담센터에 문의해 보세요.";
  } else {
    label = "전문 도움 권장 단계입니다.";
    advice = "최근 심한 우울감이나 일상 기능 저하가 있다면 빠르게 전문가와 상담하시기 바랍니다.";
  }
  // show result
  resultText.innerHTML = `<p class="q-title">${label}</p><p class="small-note">${advice}</p>`;
  // resources (placeholders - replace with actual regional contacts)
  resourceDiv.innerHTML = `
    <strong>긴급 연락처(예시)</strong>
    <ul>
      <li>청소년 전화: 1388</li>
      <li>자살 예방 상담: 1393</li>
      <li>긴급(119)</li>
    </ul>
    <p>광주·전남 지역 상담센터 연락처는 페이지 하단의 지역정보를 확인하세요.</p>
  `;
  // hide quiz, show result
  document.getElementById('quiz').classList.add('hidden');
  resultSection.classList.remove('hidden');
  // store anonymous stats in localStorage for demo (NOT for production)
  try{
    const hist = JSON.parse(localStorage.getItem('diag_hist')||'[]');
    hist.push({ts:Date.now(), score, region:'unknown'});
    localStorage.setItem('diag_hist', JSON.stringify(hist));
  }catch(e){console.warn(e)}
}

function restart(){
  answers = new Array(questions.length).fill(null);
  current = 0;
  document.getElementById('quiz').classList.remove('hidden');
  resultSection.classList.add('hidden');
  renderQuestion(0);
}

prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
restartBtn.addEventListener('click', restart);

// initial render
renderQuestion(0);
