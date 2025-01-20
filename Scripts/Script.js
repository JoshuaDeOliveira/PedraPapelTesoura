const Jokenpo = {
  Valores:{
    Vitorias: 0,
    Derrotas: 0,
    Empates: 0,
  },
  Visual:{
    Vitoria: document.getElementById('VicPontu'),
    Derrota: document.getElementById('DerPontu'),
    Empate: document.getElementById('EmpPontu'),
    Ganhar: document.getElementById('Ghanor'),
    Player: document.getElementById('Player'),
    Computador: document.getElementById('Computador')
  },
}

/*Motor*/

function PlayGame(Player){
  let CPU = BatatinhaFrita()
  let Res = PedraPapelTesoura(CPU, Player)
  Contador()

  Jokenpo.Visual.Ganhar.innerHTML = Res
  Jokenpo.Visual.Player.innerHTML = Player
  Jokenpo.Visual.Computador.innerHTML = CPU
}

/*Funções*/

function Resetar(){
  Jokenpo.Valores.Empates = 0
  Jokenpo.Valores.Derrotas = 0
  Jokenpo.Valores.Vitorias = 0
  Contador()  
}

function PedraPapelTesoura(CPU1, P1){
  let Resultado = ''; 

  switch (P1) {
    case '🤛':
      if (CPU1 === '🤛') {
        Resultado = 'Empate.'
        Jokenpo.Valores.Empates += 1;
      } else if (CPU1 === '✌') {
        Resultado = 'Vitoria.'
        Jokenpo.Valores.Vitorias += 1;
      } else {
        Resultado = 'Derrota.'
        Jokenpo.Valores.Derrotas += 1;
      }

      break;

    case '✌':
      if (CPU1 === '🤛'){
        Resultado = 'Derrota.'
        Jokenpo.Valores.Derrotas += 1;
      } else if (CPU1 === '✌'){
        Resultado = 'Empate.'
        Jokenpo.Valores.Empates += 1;
      } else {
        Resultado = 'Vitoria.'
        Jokenpo.Valores.Vitorias += 1;
      }
      break;

    case '✋':
      if (CPU1 === '🤛'){
        Resultado = 'Vitoria.'
        Jokenpo.Valores.Vitorias += 1;
      } else if (CPU1 === '✌'){
        Resultado = 'Derrota.'
        Jokenpo.Valores.Derrotas += 1;
      } else {
        Resultado = 'Empate.'
        Jokenpo.Valores.Empates += 1;
      }
      break;

    default:
      Resultado = 'Sem jogada calculada'
      break;
  }

  return Resultado
}

function BatatinhaFrita(){
  let Aleatorio = Math.random()
  let CPU = '';

  if (Aleatorio < 1/3){
    CPU = '🤛';
  } else if (Aleatorio < 2/3) {
    CPU = '✋';
  } else{
    CPU = '✌';
  }

  return CPU
}

function Contador(){
  Jokenpo.Visual.Vitoria.innerHTML = Jokenpo.Valores.Vitorias
  Jokenpo.Visual.Derrota.innerHTML = Jokenpo.Valores.Derrotas
  Jokenpo.Visual.Empate.innerHTML = Jokenpo.Valores.Empates
}

/*Teste*/

function Test(){
  window.alert(`A quantidade de vitorias foi ${Jokenpo.Valores.Vitorias}`)
}