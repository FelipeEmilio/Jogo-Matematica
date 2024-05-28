let pontos = 0;
let tempoRestante = 60;
let intervalo;

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("answer").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkAnswer();
    }
  });

  document.getElementById("reiniciar").addEventListener("click", reiniciar);
});

function reiniciar() {
  clearInterval(intervalo);
  iniciarJogo();
}

function iniciarJogo() {
  pontos = 0;
  tempoRestante = 60;
  exibirOperacao();
  atualizarPontuacao();
  atualizarTempo();
  document.getElementById("answer").disabled = false;
  document.getElementById("reiniciar").disabled = false;
  document.getElementById("result").textContent = ""; // Limpar a mensagem "Fim do jogo!"
  clearInterval(intervalo);
  intervalo = setInterval(atualizarTempo, 1000);
}

function exibirOperacao() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operadores = ["+", "-", "*", "/"];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];
  const operacao = `${num1} ${operador} ${num2}`;
  document.getElementById("operation").textContent = operacao;
}

function checkAnswer() {
  const respostaUsuario = parseFloat(document.getElementById("answer").value);
  const operacao = document.getElementById("operation").textContent;
  const respostaCorreta = eval(operacao);
  if (respostaUsuario === respostaCorreta) {
    pontos++;
    document.getElementById("result").textContent = "Resposta correta!";
  } else {
    document.getElementById("result").textContent = "Resposta incorreta.";
  }
  atualizarPontuacao();
  exibirOperacao();
  document.getElementById("answer").value = "";
}

function atualizarPontuacao() {
  document.getElementById("score").textContent = `Pontuação: ${pontos}`;
}

function atualizarTempo() {
  if (tempoRestante > 0) {
    tempoRestante--;
    document.getElementById("time").textContent = `Tempo restante: ${tempoRestante}`;
  } else {
    clearInterval(intervalo);
    document.getElementById("result").textContent = `Fim do jogo!`;
    document.getElementById("answer").disabled = true;
    document.getElementById("reiniciar").disabled = false;
    document.getElementById("time").textContent = "";
  }
}