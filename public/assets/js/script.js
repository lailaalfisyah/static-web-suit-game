class TheGame { 
  constructor() {
    let thisGame = this;

    this.com = new Com(() => thisGame.compare(thisGame.player.suit , thisGame.com.suit));
    this.player = new Player(this.com);
    this.info = document.querySelector('.info');
    this.refreshButton = document.querySelector('.refresh');    
    this.#registerRefreshButton();
  }
  
  compare(player, com) {
    let thisGame = this;

    if (player == com) return thisGame.hasil('DRAW');
    if (player == 'batu') return (com == 'gunting' ? thisGame.hasil('PLAYER 1 WIN') : thisGame.hasil('COM WIN'));
    if (player == 'gunting') return (com == 'batu' ? thisGame.hasil('COM WIN') : thisGame.hasil('PLAYER 1 WIN'));
    if (player == 'kertas') return (com == 'batu' ? thisGame.hasil('PLAYER 1 WIN') : thisGame.hasil('COM WIN'));
  }
  
  hasil(champion) {
    this.info.classList.add('styling-info');
    this.info.innerText = champion;
    console.log(this.info.innerText);
  }

  #registerRefreshButton() {
    let theGame = this;

    this.refreshButton.addEventListener('click', function() {
      theGame.com.resetSuit();
      theGame.player.resetSuit();
      theGame.info.classList.remove('styling-info');
      theGame.info.innerText = 'VS';
    });
  }
}

class Pemain {
  constructor(batu, gunting, kertas, nextPlayer) {
    this.bet = null;
    this.nextPlayer = nextPlayer;
    this.pilihanPlayer = document.querySelectorAll('#player > img');
    this.batu = document.querySelector(batu);
    this.kertas = document.querySelector(kertas);
    this.gunting = document.querySelector(gunting);
  }

  get suit() {
    return this.bet;
  }

  resetSuit() {
    this.bet = null;
    this.batu.classList.remove('yang-dipilih');
    this.kertas.classList.remove('yang-dipilih');
    this.gunting.classList.remove('yang-dipilih');
  }
  
  next() {
    this.nextPlayer.dice ? this.nextPlayer.dice() : this.nextPlayer();
  }
}

class Player extends Pemain {
  constructor(nextPlayer) {
    super('#player > .batu', '#player > .gunting', '#player > .kertas', nextPlayer);
    let currentPlayer = this;
    
    this.pilihanPlayer.forEach(function(imgPilihan) {
      imgPilihan.addEventListener('click', function() {
        currentPlayer.bet = imgPilihan.className;
        this.classList.toggle('yang-dipilih');
        console.log(currentPlayer.bet);
        currentPlayer.next();
      });
    });
  }
}

class Com extends Pemain { 
  constructor(nextPlayer) {
    super('#com > .batu', '#com > .gunting', '#com > .kertas', nextPlayer);
  }

  dice() {
    let options = ['batu', 'gunting', 'kertas'];
    this.bet = options[Math.floor(Math.random()*options.length)];
    this.imgCom = document.querySelector(`#com > .${this.bet}`);
    this.imgCom.classList.add('yang-dipilih');
    console.log(this.bet);
    this.next();
  }
}

let play = new TheGame();

// PSEUDOCODE
// 1. Player klik pilihannya, styling, kembalikan nilainya
// 2. Com mengacak pilihannya, styling, kembalikan nilainya
// 3. Tentukan menang-kalah
// 4. Tampilkan hasil permainannya