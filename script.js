let cartas1 = {
  nome: "Jibe",
  imagem: " https://criticalhits.com.br/wp-content/uploads/2020/04/jimbe.jpg",
  atributos: {
    attack: 7,
    defense: 15,
    magic: 10,
  },
};
let cartas2 = {
  nome: "Roronoa Zoro",
  imagem: "https://sm.ign.com/t/ign_br/screenshot/default/blob_va9k.1200.jpg",
  atributos: {
    attack: 15,
    defense: 8,
    magic: 8,
  },
};
let cartas3 = {
  nome: "Luffy",
  imagem:
    "https://i0.wp.com/loucosporgeek.com.br/wp-content/uploads/2020/11/pjimage.jpg?resize=708%2C372&ssl=1",
  atributos: {
    attack: 15,
    defense: 10,
    magic: 10,
  },
};

//vetor de objetos BARALHO, com todos as minhas cartas(objetos)
let baralho = [cartas1, cartas2, cartas3];
let cartaMaquina; //Carta da máquina
let cartaJogador; //Carta do jogador

function novaCarta() {
  let imagemCarta = document.getElementById("imagem");
  let nomeCarta = document.getElementById("nome");
  let ataqueCarta = document.getElementById("attack");
  let defesaCarta = document.getElementById("defense");
  let magiaCarta = document.getElementById("magic");
  let novaCarta = {
    nome: nomeCarta.value,
    imagem: imagemCarta.value,
    atributos: {
      attack: ataqueCarta.value,
      defense: defesaCarta.value,
      magic: magiaCarta.value,
    },
  };
  baralho.push(novaCarta);
}
console.log(baralho);
//Sorteando uma carta que está no meu vetor de objetos para a cartaMaquina e cartaJogador
function sortearCarta() {
  //crio uma variavel que recece um número aleatório de acordo com o tamanho do meu vetor de arrays "baralho"
  let numeroCartaMaquina = parseInt(Math.random() * baralho.length);
  //recebo o meu vetor de arrays passando o número gerado aleatoriamente
  cartaMaquina = baralho[numeroCartaMaquina];
  let numeroCartaJogador = parseInt(Math.random() * baralho.length);
  //verifico se o numero da maquina é igual ao do jogador, se for igual, sorteio o do jogador novamente.
  while (numeroCartaMaquina === numeroCartaJogador) {
    numeroCartaJogador = parseInt(Math.random() * baralho.length);
  }
  //recebo o meu vetor de arrays passando o número gerado aleatoriamente
  cartaJogador = baralho[numeroCartaJogador];

  console.log(cartaJogador.imagem);
  exibirImagem();
  //exibo meus atributos depois de sortear as cartas
  exibirAtributos();
}
function exibirImagem() {
  //Aqui eu crio a imagem da respectiva carta gerada aleatóriamente para o jogador e a máquina.
  //pego o que tem na minha div "imagemJogador"
  let imagemJ = document.getElementById("imagemJogador"); //minha div "imagemJogador"
  let imagemJogador = `<img class="imagem" src="${cartaJogador.imagem}" alt="">`; //crio uma variavel que recebe a tag IMG recebendo a imagem da carta sorteada
  imagemJ.innerHTML += imagemJogador; //coloco a imagemJOGADOR dentro da minha div "imagemJogador"

  let imagemM = document.getElementById("imagemMaquina");
  let imagemMaquina = `<img class="imagem" src="${cartaMaquina.imagem}" alt=""> `; //crio uma variavel que recebe a tag IMG recebendo a imagem da carta sorteada
  imagemM.innerHTML += imagemMaquina; //coloco a imagemMAQUINA dentro da minha div"imagemMaquina"

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
}
//exibe meus atributos em opção de input(selecionar), de acordo com cada carta sorteada
function exibirAtributos() {
  let opcoesMaquina = document.getElementById("opcoesMaquina");

  let inputRadio = document.getElementById("inputRadioJogador"); //div do input
  let nomeAtributo = document.getElementById("nomeAtributo"); //div do nome do atributo e o valor ex: attack = 10
  let escrevoInput = "";
  let escrevoNomeAtributoValor = "";

  let nomeAtributoMaquina = document.getElementById("nomeAtributoMaquina"); //div do nome do atributo e o valor ex: defesa = 10
  let opcoesTexto2 = "";

  //faço uma váriavel(atributos) percorrer a cartaJogador e dentro da carta acesso meu objeto ATRIBUTOS,
  // criando um input(botão selecionar), para cada um.
  for (let atributos in cartaJogador.atributos) {
    escrevoInput += `<input class="radio" type="radio" name="atributo" value="${atributos}">`;
    escrevoNomeAtributoValor += `  ${atributos}=${cartaJogador.atributos[atributos]}`;
  }
  for (let atributos1 in cartaMaquina.atributos) {
    opcoesTexto2 += `${atributos1} = ${cartaMaquina.atributos[atributos1]}<br>`;
  }

  inputRadio.innerHTML += escrevoInput;
  nomeAtributo.innerHTML += escrevoNomeAtributoValor;
  nomeAtributoMaquina.innerHTML += opcoesTexto2;
}

//obtendo o valor que eu selecionei no meu input RADIO(na função exibeOpocoes())
function obtemAtributoSelecionado() {
  //to trazendo todos os radios que tem o nome "atributos"
  let radioAtributos = document.getElementsByName("atributo");
  for (let i = 0; i < radioAtributos.length; i++) {
    //faço um check para saber qual o input selecionado ou marcado
    if (radioAtributos[i].checked == true) {
      //retorna qual input está selecionado
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  //faço uma variavel que recebe o valor do atributo selecionado
  let atributoSelecionado = obtemAtributoSelecionado();
  let resultado = document.getElementById("resultado");
  //crio duas variaveis para receber a carta com o atributo selecionado(a variavel que eu criei em cima)
  let valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  let valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];
  // if (valorCartaJogador) {
  //   alert("tente");
  // }
  // console.log(`>>>${atributoSelecionado.value}`);
  if (valorCartaJogador > valorCartaMaquina) {
    resultado.innerHTML = `You won, Player Card: ${cartaJogador.nome}; Attribute: ${atributoSelecionado}=${valorCartaJogador}`;
    resultado.innerHTML += `<br><button id="refresh">Reload</button>`;
  } else if (valorCartaMaquina > valorCartaJogador) {
    resultado.innerHTML = `You lose, Machine Card: ${cartaMaquina.nome}; Attribute: ${atributoSelecionado}=${valorCartaMaquina}`;
    resultado.innerHTML += `<br><button id="refresh">Reload</button>`;
  } else if (atributoSelecionado == undefined) {
    resultado.innerHTML = "Please check an attribute.";
  } else {
    resultado.innerHTML = "A tie";
    resultado.innerHTML += `<br><button id="refresh">Reload</button>`;
  }
  console.log(
    `Carta máquina: ${cartaMaquina.nome}; Atributo: ${atributoSelecionado}=${valorCartaMaquina}`
  );
}
