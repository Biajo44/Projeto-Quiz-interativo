//* Fundo estilo Matrix  *//
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const letters = "ベアトリス・ディアス";
const fontSize = 17;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.font = fontSize + "px monospace";
  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

setInterval(drawMatrix, 35);

  //*  Fim  *//


//*  Quiz  *//
const startScreen = document.getElementById("start-screen");
const nameScreen = document.getElementById("name-screen");
const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const nomeInput = document.getElementById("nomeInput");
const questaoEl = document.getElementById("questao");
const opcaoEl = document.getElementById("opcao");
const introTexto = document.getElementById("introTexto");
const btnInicio = document.getElementById("btnInicio");
const btnContinue = document.getElementById("btnContinue");
const btnQuiz = document.getElementById("btnQuiz");
const btnRefazer = document.getElementById("btnRefazer");
const quizContainer = document.querySelector(".quiz-container");


let current = 0;
let score = 0;
let nome = "";

//*  Fim  *//


//* Perguntas interativas *//
const quizData = [
  {
    questao: "Qual é o objetivo do teste de software?",
    opcao: ["Fazer o software rodar mais rápido", "Encontrar erros e garantir a qualidade do sistema", "Desenvolver a interface do usuário", "Criar banco de dados"],
    correct: 1
  },
  {
    questao: "O que significa a sigla API?",
    opcao: ["Application Programming Interface", "Advanced Programming Integration", "Automatic Process Indicator", "Applied Programming Internet"],
    correct: 0
  },
  {
    questao: "O que significa Agile no contexto de desenvolvimento de software?",
    opcao: ["Método rigoroso e burocrático", "Desenvolvimento rápido e iterativo com foco na colaboração", "Sistema operacional para servidores", "Linguagem de programação para mobile"],
    correct: 1
  },
  {
    questao: "O que é front-end em desenvolvimento web?",
    opcao: ["Parte do servidor que processa dados", "O design e a interação visível para o usuário no navegador", "A criação do banco de dados", "Um tipo de linguagem de programação"],
    correct: 1
  },
  {
    questao: "Qual é a vantagem do desenvolvimento usando frameworks?",
    opcao: ["Torna o desenvolvimento mais lento", " Proporciona ferramentas e estruturas prontas para acelerar o desenvolvimento", "Exige mais código manual", "É usado apenas para web design"],
    correct: 1
  },
   {
    questao: "Em programação orientada a objetos, o que é polimorfismo?",
    opcao: ["Capacidade de uma função aceitar diferentes tipos de dados", "Criação de múltiplas instâncias de uma classe", "Herdar atributos e métodos de uma classe pai", "Encapsulamento dos dados em uma única entidade"],
    correct: 0
  },
   {
    questao: "O que é Scrum?",
    opcao: ["Um tipo de banco de dados", "Um software de edição de imagens", "Um protótipo de software", "Uma metodologia ágil para gestão e desenvolvimento de projetos"],
    correct: 3
  },
   {
    questao: "No contexto de design de software, qual a finalidade do padrão Singleton?",
    opcao: ["Criar famílias de objetos relacionados", "Permitir múltiplas instâncias de uma classe para diferentes propósitos", "Garantir que uma classe tenha apenas uma única instância globalmente acessível", "Separar a construção de um objeto complexo"],
    correct: 2
  },
   {
    questao: "Qual a função do algoritmo de ordenação QuickSort?",
    opcao: ["Dividir o conjunto em partes menores e ordenar por combinação direta", "Selecionar o maior elemento repetidamente para ordenar o vetor", "Ordenação estável que mantém a ordem original dos elementos iguais", "Dividir e conquistar para ordenar elementos baseado em um pivô"],
    correct: 3
  },
  {
    questao: "Em sistemas distribuídos, o Teorema CAP indica que é impossível garantir simultaneamente quais propriedades?",
    opcao: ["Compatibilidade, agregação e performance", "Consistência, disponibilidade e partição de tolerância", "Confiabilidade, autenticidade e privacidade", "Controle, acesso e publicação"],
    correct: 1
  },
  {
    questao: "No contexto de segurança da informação, o que define o princípio do menor privilégio?",
    opcao: ["Garantir que usuários tenham apenas os privilégios estritamente necessários para realizar suas tarefas", "Permitir privilégios elevados para administradores apenas em horários específicos", "Restringir o acesso a recursos apenas durante ataques cibernéticos", "Dar acesso irrestrito a todos os usuários para facilitar operações"],
    correct: 0
  },
  {
    questao: "Qual comando em C++ é usado para imprimir uma mensagem na tela?",
    opcao: ["console.log()", "print()", "std::cout", "echo"],
    correct: 3
  },
  {
    questao: "Em qual situação o uso de uma função anônima (lambda) é mais indicado?",
    opcao: ["Quando se deseja nomear funções para reutilização extensa", "Para criar variáveis globais", "Quando se deseja nomear funções simples e rápida para passar como argumento", "Para definir classes em linguagem orientadas a objetos"],
    correct: 2
  },
  {
    questao: "O que significa SQL?",
    opcao: [ "Standard Query Language", "Simple Query List", "Structured Query Language", "Server Query Language"],
    correct: 2
  },
  {
    questao: "Em desenvolvimento, o que é 'debugging'",
    opcao: ["Identificar e corrigir erros", "Documentar o código", "Testar componentes", "Escrever código"],
    correct: 0
  }

];

//*  Fim  *//



//*  Navegação dos botões *//
btnInicio.onclick = () => {
  startScreen.classList.add("hidden");
  nameScreen.classList.remove("hidden");
};

btnContinue.onclick = () => {
  nome = nomeInput.value.trim();
  if (!nome) return alert("Digite seu nome!");
  nameScreen.classList.add("hidden");
  introScreen.classList.remove("hidden");
  digitarTexto(
    `Bem-vindo(a), ${nome}.\nPrepare-se para o Quiz de ADS - Análise e desenvolvimento de sistemas 💻.\n\nVocê responderá perguntas focadas nessa área e no final verá o seu percentual de acertos.\n\n O objetivo é testar seus conhecimentos e reforçar o aprendizado, de forma leve e interativa.\n\n Boa sorte e divita-se! 💻🚀`,
    introTexto,
    () => (btnQuiz.style.display = "block")
  );
};

btnQuiz.onclick = () => {
  introScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
};

btnRefazer.onclick = () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  score = 0;
  current = 0;
};

//*  Fim  *//



//*  Função da digitação  *//
function digitarTexto(texto, elemento, callback) {
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, 50); //*tempo da digitação*//
}

//*  Fim  *//



//*   Perguntas    *//
function loadQuestion() {
  const q = quizData[current];
  questaoEl.textContent = q.questao;
  opcaoEl.innerHTML = "";
  q.opcao.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, q.correct);
    opcaoEl.appendChild(btn);
  });
}

//*  Fim  *//



//*  Função verifica e avança  *//
function checkAnswer(selected, correct) {
  if (selected === correct) score++;
  quizContainer.classList.add("flipping");
  setTimeout(() => {
    current++;
    if (current < quizData.length) {
      loadQuestion();
    } else {
      mostrarResultado();
    }
    setTimeout(() => quizContainer.classList.remove("flipping"), 100);
  }, 600);
}

//*  Fim  *//



//*  Função resultado  *//
function mostrarResultado() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const total = quizData.length;
  const erros = total - score;
  const percentual = Math.round((score / total) * 100);
  const resultTitulo = document.getElementById("resultTitulo");
  const resultResumo = document.getElementById("resultResumo");

  let mensagem = "";
  if (percentual >= 80) mensagem = "Excelente! 🤩";
  else if (percentual >= 50) mensagem = "Bom desempenho! 👏";
  else mensagem = "Precisa melhorar! 💪";

  resultTitulo.textContent = `Resultado de ${nome}`;
  resultResumo.innerHTML = `
    ✅ Acertos: ${score}<br>
    ❌ Erros: ${erros}<br>
    📊 Aproveitamento: ${percentual}%<br><br>
    <b>${mensagem}</b>
  `;

  //*  Fim  *//



  //* Gráfico com Chart.js *//
  const ctxGrafico = document.getElementById("graficoDesempenho");
  new Chart(ctxGrafico, {
    type: "pie",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [{
        data: [score, erros],
        backgroundColor: ["#FF0000", "#330000"],
        borderColor: "#FF5555",
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#FF0000" } }
      }
    }
  });
}
