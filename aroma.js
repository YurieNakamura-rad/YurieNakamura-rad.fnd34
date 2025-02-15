'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let currentQuiz = []; // 空箱を作成
const totalQuestions = quizData.length; // 全問題数を取得
let currentQuestion = 0; // 現在の問題番号を0に初期化
let score = 0; // 正解数（スコア）を初期化
document.getElementById("total-questions").textContent = totalQuestions; // 全問題数を表示

// 問題をランダムに設定
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // iとjを入れ替える
  }
  return array;
}

// 初期化
function initQuiz() {
  currentQuestion = 0;
  score = 0;
  currentQuiz = shuffleArray([...quizData]); // クイズデータをシャッフル
  loadQuestion(); // 最初の問題を表示
}

// 問題と選択肢を表示
function loadQuestion() {
  document.getElementById("quiz-container").style.display = "block"; // クイズを表示
  document.getElementById("answer-section").style.display = "none"; // 回答結果を非表示
  document.getElementById("final-result").style.display = "none"; // 最終結果を非表示

// 現在の問題番号を表示
  document.getElementById("question-number").textContent = `第 ${currentQuestion + 1} 問`;
  const questionData = currentQuiz[currentQuestion]; // シャッフルデータの取得
  document.getElementById("question").textContent = questionData.question; // 問題文を表示
  const choicesContainer = document.getElementById("choices-container");

// 選択肢を表示
  questionData.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    choiceDiv.textContent = `${choice.text}`; // 選択肢表示
    choiceDiv.onclick = () => checkAnswer(index, questionData); // 選択肢クリック時に答えを確認
    choicesContainer.appendChild(choiceDiv); // 選択肢をHTMLに追加
    }
  );
}

  // 答えを確認
function checkAnswer(selected, questionData) {
  document.getElementById("quiz-container").style.display = "none"; // クイズを非表示
  document.getElementById("answer-section").style.display = "block"; // 回答結果を表示
    
  const resultText = document.getElementById("answer-result");
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = ""; // 選択肢をクリアして再表示

  // 正解・不正解を確認
  if (selected === questionData.correct) {
    resultText.innerHTML = "<span class='correct'>素晴らしい！正解！</span>";
    score++; // スコアを増やす
  } else {
    resultText.innerHTML = "<span class='wrong'>残念！次はきっと正解できるよ！</span>";
  }
  // 最終問題かどうかを確認
  if (currentQuestion === currentQuiz.length - 1) {
    document.getElementById("next-question").textContent = "結果を見る";
  } else {
    document.getElementById("next-question").textContent = "次の問題へ";
  }
}

// 次の問題へ
function nextQuestion() {
  currentQuestion++; // 現在の問題番号を次へ進める
  if (currentQuestion < currentQuiz.length) {
    loadQuestion(); // 次の問題を表示
    document.getElementById("container").scrollIntoView({ behavior: "smooth" }); // スムーズスクロール
  } else {
    showResult(); // 最終結果を表示
  }
}

// 結果
function showResult() {
  document.getElementById("answer-section").style.display = "none"; // 回答結果を非表示
  document.getElementById("final-result").style.display = "block"; // 最終結果を表示
  const percentage = (score / currentQuiz.length) * 100; // 正解率
  document.getElementById("score").textContent = `正解数: ${score}/${currentQuiz.length} (${percentage.toFixed(2)}%)`;
}

// もう一度クイズを始める
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  return initQuiz();
}

// クイズ開始
initQuiz();



// 背景素材　(SOZAI GOOD_URL:sozai-good.com)
