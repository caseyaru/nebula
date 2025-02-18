import { initCards } from "./modules/cards.js";
import { form, validateAll } from './modules/form.js';

initCards();
validateAll();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    let data = {};

    console.log(formData)
    formData.delete('use');

    const useCheckboxes = form.querySelectorAll('input[name="detail"]:checked');
    const useValues = Array.from(useCheckboxes).map(checkbox => checkbox.value);
    formData.append('details', JSON.stringify(useValues));

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data);
});