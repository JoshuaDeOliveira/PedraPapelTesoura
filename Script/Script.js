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
  },Pontos: JSON.parse(localStorage.getItem('Pontos') || "{Wins: 0, Losses: 0, Draw: 0}")
}

document.addEventListener('DOMContentLoaded', function(){
  Atualizar()
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

function Reset(){
  Score.Pontos.Wins = 0
  Score.Pontos.Losses = 0
  Score.Pontos.Draw = 0
  Atualizar() 
}