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
  const containerWidth = list.offsetWidth;
  const cardWidth = containerWidth;
  const pixelOffset = (20 / containerWidth) * 100;

  let offset;
  if (visibleCards === 1) {
    offset = (currentIndex * cardWidth / containerWidth) * 100;
  } else {
    offset = (currentIndex / (totalCards - visibleCards)) * 100;
    offset += currentIndex > 0 ? pixelOffset : 0;
  }

  list.style.transform = `translateX(-${offset}%)`;
};

const updateVisibleCardsCount = () => {
  if (window.innerWidth < 1024) {
    visibleCards = 1;
  } else {
    visibleCards = 3;
  }
  updateVisibleCards();
};

const updateButtons = () => {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex + visibleCards >= cardsData.length;
};

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateVisibleCards();
    updateButtons();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex + visibleCards < cardsData.length) {
    currentIndex++;
    updateVisibleCards();
    updateButtons();
  }
});

window.addEventListener('resize', updateVisibleCardsCount);

export const initCards = () => {
  getCards();
  updateVisibleCardsCount();
};
