const cards = document.querySelectorAll('.card');
let flipped = false;
let lockBoard = false;
let card1, card2;

function flip() {
  if (lockBoard) return;
  if (this === card1) return;
  this.classList.add('flip');
  if (!flipped) {
    flipped = true;
    card1 = this;
    return;
  }
  card2 = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = card1.dataset.emoji === card2.dataset.emoji;
  isMatch ? pause() : unflip();
}

function pause() {
  card1.removeEventListener('click', flip);
  card2.removeEventListener('click', flip);
  resetBoard();
}

function unflip() {
  lockBoard = true;
  setTimeout(() => {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flipped, lockBoard] = [false, false];
  [card1, card2] = [null, null];
}
(function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 20);
    card.style.order = random;
  });
})();

function hoverCard() {
  this.style.border = "4px solid red";
}

function offCard() {
  this.style.border = "0";
}
cards.forEach(card => card.addEventListener('click', flip));
cards.forEach(card => card.addEventListener('mouseover', hoverCard));
cards.forEach(card => card.addEventListener('mouseout', offCard));