'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let currentQuiz = quizData; // クイズのデータ全体を格納
//let answer = quizAnswer; // 回答選択肢 
const totalQuestions = quizData.length; // 全問題数を取得
let currentQuestion = 0; // 現在の問題番号を0に初期化
let score = 0; // 正解数（スコア）を初期化
document.getElementById("total-questions").textContent = totalQuestions; // 全問題数を表示

  // 初期化
function initQuiz() {
  currentQuestion = 0; // 最初の問題にリセット
  score = 0; // スコアのリセット
  loadQuestion(); // 最初の問題を表示
}

  // 問題と選択肢を表示
function loadQuestion() {
  document.getElementById("quiz-container").style.display = "block"; // クイズ部分を表示
  document.getElementById("answer-section").style.display = "none"; // 結果表示を非表示
  document.getElementById("final-result").style.display = "none"; // 最終結果を非表示


  // 現在の問題番号を表示
  document.getElementById("question-number").textContent = `第 ${currentQuestion + 1} 問`;
  const questionData = currentQuiz[currentQuestion]; // 現在の問題データを取得
  document.getElementById("question").textContent = questionData.question; // 問題文を表示
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = ""; // 選択肢をクリア
  
  // 選択肢を表示
  questionData.choices.forEach((choice, index) => {
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");
    choiceDiv.textContent = `${choice.text}`; // 選択肢表示
    choiceDiv.onclick = () => checkAnswer(index, questionData); // 選択肢クリック時に答えを確認
    choicesContainer.appendChild(choiceDiv); // 選択肢をHTMLに追加
  });
}

  // 答えを確認
  function checkAnswer(selected, questionData) {
    document.getElementById("quiz-container").style.display = "none"; // クイズ部分を非表示
    document.getElementById("answer-section").style.display = "block"; // 答えの表示部分を表示
    
    const resultText = document.getElementById("answer-result");
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; // クリアして選択肢を再描画

    // 正解・不正解を確認
    if (selected === questionData.correct) {
      resultText.innerHTML = "<span class='correct'>正解！</span>";
      score++; // スコアを増やす
    } else {
      resultText.innerHTML = "<span class='wrong'>不正解です。</span>";
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

  // 結果を表示
  function showResult() {
    document.getElementById("answer-section").style.display = "none"; // 答えのセクションを非表示
    document.getElementById("final-result").style.display = "block"; // 最終結果セクションを表示
    const percentage = (score / currentQuiz.length) * 100; // 正解率を計算
    document.getElementById("score").textContent = `正解数: ${score}/${currentQuiz.length} (${percentage.toFixed(2)}%)`;
  }

  // クイズを再スタート
  function restartQuiz() {
    currentQuestion = 0; // 問題番号を初期化
    score = 0; // スコアを初期化
    initQuiz(); // クイズを再スタート
  }

  // クイズ開始
  initQuiz();



  // 背景素材　(SOZAI GOOD URL:sozai-good.com)
