let radio;
let inputBox;
let submitButton;
let resultMessage = "";
let questions; // 儲存題目資料
let currentQuestionIndex = 0; // 當前題目索引
let correctCount = 0; // 答對題數
let incorrectCount = 0; // 答錯題數

function preload() {
  // 載入題目資料（CSV 格式）
  questions = loadTable("questions.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#CBC5EA");

  // 建立選項（選擇題用）
  radio = createRadio();
  radio.style('width', '200px');

  // 建立輸入框（填充題用）
  inputBox = createInput();
  inputBox.hide(); // 預設隱藏

  // 建立送出按鈕
  submitButton = createButton("送出");
  submitButton.mousePressed(checkAnswer);

  // 顯示第一題
  displayQuestion();
}

function draw() {
  background("#CBC5EA");
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text("答對題數：" + correctCount, 70,20);
  text("答錯題數：" + incorrectCount, 70,50);
  text("412730979陳品慈",100,80);

  if (currentQuestionIndex < questions.getRowCount()) {
    // 顯示題目
    text(questions.getString(currentQuestionIndex, "question"), width / 2, height / 2 - 100);

    // 顯示結果訊息
    textSize(20);
    fill(resultMessage === "答對了！" ? "green" : "red");
    text(resultMessage, width / 2, height / 2 + 100);
  } else {
    // 顯示測驗結果
    text("測驗結束！", width / 2, height / 2 - 50);
    text(`答對題數：${correctCount}`, width / 2, height / 2);
    text(`答錯題數：${incorrectCount}`, width / 2, height / 2 + 50);
  }
}

function displayQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    // 清空選項和輸入框
    radio.html("");
    inputBox.hide();

    // 顯示當前題目
    const type = questions.getString(currentQuestionIndex, "type");
    if (type === "choice") {
      // 顯示選擇題選項
      const options = questions.getString(currentQuestionIndex, "options").split(",");
      for (let option of options) {
        radio.option(option.trim());
      }
      radio.show();
      radio.position(width / 2 - 100, height / 2 - 50);
      submitButton.position(width / 2 - 30, height / 2 + 50);
    } else if (type === "fill") {
      // 顯示填充題輸入框
      inputBox.show();
      inputBox.position(width / 2 - 100, height / 2 - 50);
      submitButton.position(width / 2 - 30, height / 2 + 50);
    }
  }
}

function checkAnswer() {
  if (currentQuestionIndex < questions.getRowCount()) {
    const type = questions.getString(currentQuestionIndex, "type");
    let userAnswer = "";

    if (type === "choice") {
      userAnswer = radio.value();
    } else if (type === "fill") {
      userAnswer = inputBox.value().trim();
    }

    const correctAnswer = questions.getString(currentQuestionIndex, "answer");

    if (userAnswer === correctAnswer) {
      resultMessage = "答對了！";
      correctCount++;
    } else {
      resultMessage = "答錯了！";
      incorrectCount++;
    }

    // 前往下一題
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.getRowCount()) {
      displayQuestion();
    } else {
      // 隱藏選項、輸入框和按鈕
      radio.hide();
      inputBox.hide();
      submitButton.hide();
    }
  }
}
