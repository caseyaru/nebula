import { initCards } from "./modules/cards.js";
import { form, validateAll } from './modules/form.js';

initCards();
validateAll();

form.addEventListener("submit", (event) => {
    event.preventDefault();
  });