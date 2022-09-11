import "./style.css";

let cardsArr = [];
const input = document.querySelector("#Cards");
const btnDraw = document.querySelector(".Draw");
const btnSort = document.querySelector(".Sort");
const numsCards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
const suitsCards = ["♦", "♥", "♠", "♣"];

// Card constructor
class Card {
  constructor(num, suit) {
    this.suit = suit;
    this.num = num;
  }
}

// Event listeners

btnDraw.addEventListener("click", () => {
  let numCards = input.value;
  cardsArr = generateCardsArray(numCards);
  addCards(cardsArr, false, 0);
});

btnSort.addEventListener("click", () => {
  clearSortedContainer();
  bubbleSort(cardsArr);
});

// Functions

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const clearSortedContainer = () => {
  let cardsContainerSorted = document.querySelector(".cards-sorted-container");
  while (cardsContainerSorted.firstChild) {
    cardsContainerSorted.removeChild(cardsContainerSorted.firstChild);
  }
};

// Depending on the value passed, create an array of cards with their suits and nums assigned.
const generateCardsArray = numCards => {
  let cardsArr = [];

  for (let i = 0; i < numCards; i++) {
    let card = new Card();
    card.suit = suitsCards[getRandomNum(0, suitsCards.length - 1)];
    card.num = numsCards[getRandomNum(0, numsCards.length - 1)];
    cardsArr.push(card);
  }
  return cardsArr;
};

// Depending of the suit, create a certain card
const generateCard = card => {
  if (["♦", "♥"].includes(card.suit)) {
    return `<div class="card"> <div class="suit suit--top color--red">${card.suit}</div> <div class="number">${card.num}</div> <div class="suit suit--bottom color--red">${card.suit}</div> </div>`;
  } else {
    return `<div class="card"> <div class="suit suit--top color--black">${card.suit}</div> <div class="number">${card.num}</div> <div class="suit suit--bottom color--black">${card.suit}</div> </div>`;
  }
};

const addCards = (cardsArr, sort, iterationNum) => {
  let cardsContainer = document.querySelector(".cards-container");
  let cardsContainerSorted = document.querySelector(".cards-sorted-container");
  let cardsDOM = "";

  for (let i = 0; i < cardsArr.length; i++) {
    cardsDOM += generateCard(cardsArr[i]);
  }
  // If sort is set to false, only displays the cards
  if (!sort) {
    cardsContainer.innerHTML =
      '<div class="cards-container-row">' + cardsDOM + "</div>";
  } else {
    // If sort is set to true, sort them
    cardsContainerSorted.innerHTML +=
      '<div class="cards-container-sort-row"> <div class="container-iteration-num"> <p class="iteration-num">' +
      iterationNum +
      "</p> </div> " +
      cardsDOM +
      " </div>";
  }
};

// Bubble sort

const bubbleSort = cardsArr => {
  let newCardsArr = [...cardsArr];
  let iterationNum = -1;

  for (let i = 0; i < newCardsArr.length; i++) {
    for (let j = 0; j < newCardsArr.length - i - 1; j++) {
      if (
        numsCards.indexOf(newCardsArr[j].num) >
        numsCards.indexOf(newCardsArr[j + 1].num)
      ) {
        const lesser = newCardsArr[j + 1];
        newCardsArr[j + 1] = newCardsArr[j];
        newCardsArr[j] = lesser;
        iterationNum++;
        addCards(newCardsArr, true, iterationNum);
      }
    }
  }

  if (iterationNum == -1) {
    addCards(newCardsArr, true, 0);
  }

  return newCardsArr;
};
