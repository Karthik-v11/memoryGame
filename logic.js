const cards = document.querySelectorAll(".memory-card");
const winboard = document.getElementsByClassName("win");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  checkWin();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

function checkWin() {
  count++;
  if (count == 6) {
    winboard[0].style.display = "flex";
  }
}
