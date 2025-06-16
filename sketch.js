let questions = [
  {
    question: "Qual é o maior produtor de soja do mundo?",
    options: ["Estados Unidos", "Brasil", "China", "Argentina"],
    answer: 1
  },
  {
    question: "O que é agricultura orgânica?",
    options: ["Uso de agrotóxicos", "Uso de fertilizantes químicos", "Sem agrotóxicos e sustentável", "Queima de florestas"],
    answer: 2
  },
  {
    question: "Qual desses alimentos não é um grão?",
    options: ["Arroz", "Feijão", "Milho", "Alface"],
    answer: 3
  },
  {
    question: "O que é agrofloresta?",
    options: ["Floresta artificial", "Plantações em desertos", "Cultivo que integra árvores e plantações", "Plantio feito à noite"],
    answer: 2
  },
  {
    question: "O que significa 'safra'?",
    options: ["Tipo de solo", "Época de colheita", "Praga agrícola", "Tipo de fertilizante"],
    answer: 1
  },
  {
    question: "Qual é típico da agricultura familiar?",
    options: ["Soja em larga escala", "Minério de ferro", "Café orgânico", "Petróleo"],
    answer: 2
  },
  {
    question: "O que é rotação de culturas?",
    options: ["Plantar sempre o mesmo", "Alternar culturas para melhorar o solo", "Colher à noite", "Plantio só de árvores"],
    answer: 1
  },
  {
    question: "Qual desses países é grande produtor de café?",
    options: ["Japão", "Canadá", "Noruega", "Brasil"],
    answer: 3
  },
  {
    question: "O que é irrigação?",
    options: ["Colher plantas", "Adicionar nutrientes", "Fornecimento de água às plantações", "Queimar resíduos"],
    answer: 2
  },
  {
    question: "Qual desses é impacto negativo do agro convencional?",
    options: ["Aumento da biodiversidade", "Degradação do solo", "Melhoria da água", "Preservação das florestas"],
    answer: 1
  }
];

let currentQuestion = 0;
let selectedOption = -1;
let score = 0;
let showResult = false;

let timer = 5; // 5 segundos por pergunta
let lastTime = 0;

let feedback = "";
let feedbackTimer = 0;

function setup() {
  createCanvas(700, 500);
  textSize(20);
  lastTime = millis();
}

function draw() {
  background(220);

  if (showResult) {
    textAlign(CENTER);
    text("Quiz finalizado!", width / 2, height / 2 - 30);
    text("Sua pontuação: " + score + " de " + questions.length, width / 2, height / 2);
    return;
  }

  displayQuestion();

  // Temporizador
  fill(0);
  textAlign(LEFT);
  text("Tempo restante: " + timer, 500, 50);

  if (feedback != "") {
    fill(0);
    textAlign(CENTER);
    text(feedback, width / 2, height - 50);

    if (millis() - feedbackTimer > 1500) {
      feedback = "";
      nextQuestion();
    }
    return; // pausa enquanto mostra feedback
  }

  if (millis() - lastTime >= 1000) {
    timer--;
    lastTime = millis();
    if (timer <= 0) {
      feedback = "Tempo esgotado!";
      feedbackTimer = millis();
    }
  }
}

function displayQuestion() {
  let q = questions[currentQuestion];
  textAlign(LEFT);
  text("Pergunta " + (currentQuestion + 1) + ": " + q.question, 50, 50);

  for (let i = 0; i < q.options.length; i++) {
    if (i === selectedOption) {
      fill(100, 200, 100);
    } else {
      fill(255);
    }
    stroke(0);
    rect(50, 80 + i * 60, 600, 50);
    fill(0);
    text(q.options[i], 60, 115 + i * 60);
  }
}

function mousePressed() {
  if (feedback != "") {
    return; // não permite clicar durante feedback
  }

  let q = questions[currentQuestion];
  for (let i = 0; i < q.options.length; i++) {
    let x = 50;
    let y = 80 + i * 60;
    let w = 600;
    let h = 50;
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      selectedOption = i;
      if (i === q.answer) {
        score++;
        feedback = "Parabéns! Resposta certa";
      } else {
        feedback = "Resposta errada";
      }
      feedbackTimer = millis();
    }
  }
}

function nextQuestion() {
  selectedOption = -1;
  currentQuestion++;
  timer = 5;
  lastTime = millis();
  if (currentQuestion >= questions.length) {
    showResult = true;
  }
}
