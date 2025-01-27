const list = document.querySelector("#cardsList");
const template = document.querySelector("#cardTemplate");

const prevBtn = document.querySelector(".cards__btn-prev");
const nextBtn = document.querySelector(".cards__btn-next");

let currentIndex = 0;
let cardsData = [];
let visibleCards = 3;

const getCards = () => {
  fetch("./data/cards.json")
    .then((response) => response.json())
    .then((data) => {
      cardsData = data;
      drawCards(data);
      updateButtons();
    });
};

const drawCards = (cards) => {
  list.innerHTML = "";
  cards.forEach((card) => {
    const clone = document.importNode(template.content, true);
    clone.querySelector(".cards__title").textContent = card.title;
    clone.querySelector(".cards__description").textContent = card.description;
    list.append(clone);
  });
  updateVisibleCards();
};

const updateVisibleCards = () => {
  const totalCards = cardsData.length;
  const offset = currentIndex * (100 / visibleCards);
  list.style.transform = `translateX(-${offset}%)`;
};

const updateButtons = () => {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex + 3 >= cardsData.length;
};

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateVisibleCards();
    updateButtons();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex + 3 < cardsData.length) {
    currentIndex++;
    updateVisibleCards();
    updateButtons();
  }
});

export const initCards = () => {
  getCards();
};
