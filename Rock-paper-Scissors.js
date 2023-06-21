let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
  let is_autoplay=false;
  let intervalID;

  function autoPlay(){
    
    if(!is_autoplay){
      intervalID= setInterval(
                    function(){
                    const playerMove=pickComputerMove();
                    playGame(playerMove);
                  }  ,2000);
                  is_autoplay=true;                  
    } else{
      clearInterval(intervalID);
      is_autoplay=false;
    }
  
  }
  document.body.addEventListener('keydown',(event) => {
      if(event.key === 'r'){
        playGame('rock');

      }else if(event.key === 'p' ){
        playGame('paper');
      }
      else if(event.key === 's'){
        playGame('scissors');
      }
  });


  function playGame(playerMove) {
    const computerMove = pickComputerMove();


    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'lose.';
      } else if (computerMove === 'paper') {
        result = 'win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'lose.';
      } else if (computerMove === 'scissors') {
        result = 'win.';
      }
    }

    if (result === 'win.') {
      score.wins += 1;
    } else if (result === 'lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
   
    updateScoreElement();
    // updateResult();
    // updateMoves();

    document.querySelector('.js-result').innerHTML=`You ${result}`;
    document.querySelector('.js-moves').innerHTML=`You
                <img src="./assets/${playerMove}-emoji.png" alt="" class="move-icon">
                <img src="./assets/${computerMove}-emoji.png" alt="" class="move-icon">
                Computer`;
  }


  function updateResult(){
    return( document.querySelector('.js-result').
    innerHTML=`You ${result}`);

  }

  function updateMoves(){
    document.querySelector('.js-moves').
    innerHTML=`  You
                <img src="./assets/${playerMove}-emoji.png" alt="" class="move-icon">
                <img src="./assets/${computerMove}-emoji.png" alt="" class="move-icon">
                Computer`;
  }

  function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML =`Wins: ${score.wins}, 
                Losses: ${score.losses}, 
                Ties: ${score.ties}`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }