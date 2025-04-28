let Score = {
  Parametros:{
      Resultado: "",
      Computador: "",
      Jogador: ""
  },Mostrar: {
      Vitoria: document.getElementById('Vitoria'),
      Derrota: document.getElementById('Derrota'),
      Empate: document.getElementById('Empate')
  },Resultados:{
      Resposta: document.querySelector('#Resultado'),
      Jogadas: document.querySelector('#Explicacao')
  },Pontos: JSON.parse(localStorage.getItem('Pontos')) || '{"Wins": 0,"Losses": 0, "Draw": 0}',
  Botoes: {
    Pedra: document.querySelector('.Pedra'),
    Papel: document.querySelector('.Papel'),
    Tesoura: document.querySelector('.Tesoura'),
    Reiniciar: document.querySelector('.Reset') ,
    Sozinho: document.querySelector('.AutoPlay'),
    Sim: document.querySelector('.Sim'),
    Nao: document.querySelector('.Nao')
  }
}

document.addEventListener('DOMContentLoaded', function(){
  Atualizar()
})

//Funcionamentos dos Botões

Score.Botoes.Pedra.addEventListener('click', () => Jokenpo('🤜'))
Score.Botoes.Papel.addEventListener('click', () => Jokenpo('✋'))
Score.Botoes.Tesoura.addEventListener('click', () => Jokenpo('✌')) 
Score.Botoes.Reiniciar.addEventListener('click', () => Reset())
Score.Botoes.Sozinho.addEventListener('click', () => AutoPlay())

//Funcionamento com o teclado.

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'r':
      Jokenpo('🤜')
      break;
    case 'p':
      Jokenpo('✋')
      break;
    case 's':
      Jokenpo('✌')
      break;
    case 'a':
      AutoPlay()
      break;
    case 'Backspace':
      Reset()
      break;
  }
})


function Jokenpo(Player){
  Score.Parametros.Jogador = Player
  Score.Parametros.Resultado = Engine()
  Pontos(Score.Parametros.Resultado)
  Atualizar()
  Respostas()
}

function JogadaComputador(){
  let CPU = Math.random()

  if (CPU >= 0 && CPU < 1/3) {
    return '✌'
  } else if (CPU >= 1/3 && CPU < 2/3) {
    return '🤜'
  } else {
    return '✋'
  }
}

function Engine(){
  Score.Parametros.Computador = JogadaComputador()  

  switch (Score.Parametros.Computador) {
    case '✋':
      if (Score.Parametros.Jogador === '✋') {return 'Empate'} 
      if (Score.Parametros.Jogador === '✌') {return 'Vitoria'} 
      if (Score.Parametros.Jogador === '🤜') {return 'Derrota'}
      break;
    case "✌":
      if (Score.Parametros.Jogador === "✌") {return 'Empate'} 
      if (Score.Parametros.Jogador === '🤜') {return 'Vitoria'}
      if (Score.Parametros.Jogador === '✋') {return 'Derrota'}
      break;
    case '🤜':
      if (Score.Parametros.Jogador === "🤜") {return 'Empate'}     
      if (Score.Parametros.Jogador === '✋') {return 'Vitoria'} 
      if (Score.Parametros.Jogador === '✌') {return 'Derrota'}
      break;
    default:
      console.log("O Codigo não esta funcionando")
      break;
  }
}

function Pontos(Analisar){
  if (Analisar == 'Vitoria') {
    Score.Pontos.Wins += 1
  } else if (Analisar == 'Derrota') {
    Score.Pontos.Losses += 1
  } else {
    Score.Pontos.Draw += 1
  }
}

function Atualizar(){ 
  Score.Mostrar.Derrota.innerHTML = Score.Pontos.Losses
  Score.Mostrar.Vitoria.innerHTML = Score.Pontos.Wins
  Score.Mostrar.Empate.innerHTML = Score.Pontos.Draw

  localStorage.setItem('Pontos', JSON.stringify(Score.Pontos))
}

function Respostas(){
  Score.Resultados.Resposta.style.display = 'block'
  Score.Resultados.Resposta.innerHTML = Score.Parametros.Resultado
  Score.Resultados.Jogadas.innerHTML = `Você ${Score.Parametros.Jogador} ${Score.Parametros.Computador} Computador`
  Score.Resultados.Jogadas.style.display = 'block'
}

let Certeza = document.querySelector('.js-certeza')
const Branco = () =>{
  Certeza.style.display = 'none'
  Score.Resultados.Resposta.style.display = 'none'
  Score.Resultados.Jogadas.style.display = 'none'
}

function Reset(){
  Certeza.style.display = 'block'
  document.querySelector('.Sim').addEventListener('click', () => {
    Score.Pontos.Wins = 0
    Score.Pontos.Losses = 0
    Score.Pontos.Draw = 0
    Atualizar()
    Branco()
  })
  document.querySelector('.Nao').addEventListener('click', () => {
    Branco()
  })
}

let AutoPlayer = false;
let IDIntervalo;

function AutoPlay(){
  if (!AutoPlayer){
    IDIntervalo = setInterval(  function(){
      const PlayerMove = JogadaComputador()
      Jokenpo(PlayerMove)
    }, 700)
    AutoPlayer = true
  } else {
    clearInterval(IDIntervalo)
    AutoPlayer = false;
  }
}