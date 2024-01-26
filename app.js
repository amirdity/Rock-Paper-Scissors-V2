let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScoreElement();
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}
document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
  playGame('Scissors');
});
document.body.addEventListener('keydown',(e)=>{
  if (e.key === 'r') {
    playGame('Rock');
  }else if (e.key === 'p') {
    playGame('Paper');
  }else if (e.key === 's') {
    playGame('Scissors');
  }
});
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (1/3 <= randomNumber && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  return computerMove;
}
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (computerMove === playerMove) {
    result = 'Tie.'
  }if (computerMove === 'Rock' &&  playerMove === 'Paper') {
    result = 'You win.'
  }if (computerMove === 'Rock' && playerMove === 'Scissors' ) {
    result = 'You lose.'
  }if (computerMove === 'Paper' && playerMove === 'Rock' ) {
    result = 'You lose.'
  }if (computerMove === 'Paper' && playerMove === 'Scissors' ) {
    result = 'You win.'
  }if (computerMove === 'Scissors' && playerMove === 'Paper') {
    result = 'You lose.'
  }if (computerMove === 'Scissors' && playerMove === 'Rock') {
    result = 'You win.'
  }
  if (result === 'You win.'){
    score.wins += 1;
  }if (result === 'You lose.'){
    score.losses += 1;
  }if (result === 'Tie.'){
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
  <img src="${playerMove}-emoji.png" class="move-icon">
  <img src="${computerMove}-emoji.png" class="move-icon">
  Computer`;
}
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
  `Wins: ${score.wins}  
  Losses: ${score.losses} 
  Ties : ${score.ties}`
};
