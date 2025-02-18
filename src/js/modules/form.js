const form = document.querySelector("#form");

const selectInput = form.querySelector("#form-material");

const optionsContainer = form.querySelector("#form-use");
const optionsPositions = optionsContainer.querySelector(".form__checkbox");

const descriptionInput = form.querySelector("#form-description");
const nameInput = form.querySelector("#form-name");
const nameError = form.querySelector("#form-name-error");
const numberInput = form.querySelector("#form-number");
const numberError = form.querySelector("#form-number-error");
const agreementInput = form.querySelector("#form-agree");

const submitButton = form.querySelector("#form-submit");
submitButton.disabled = true;

const validateInput = (input, error) => {
  const pattern = new RegExp(input.pattern);
  if (!pattern.test(input.value)) {
    error.style.opacity = "1";
    return false;
  } else {
    error.style.opacity = "0";
    return true;
  }
};

function formatNameInput(input) {
  input.value = input.value.trimStart();
  const words = input.value.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const capitalizedString = capitalizedWords.join(" ");
  input.value = capitalizedString;
}

const validateNameInput = () => {
  formatNameInput(nameInput);
  return validateInput(nameInput, nameError);
};

const validateNumberInput = () => {
  return validateInput(numberInput, numberError);
};

const validateForm = () => {
  const isNameValid = validateNameInput();
  const isNumberValid = validateNumberInput();
  const isAgreementValid = agreementInput.checked;

  if (isNameValid && isNumberValid && isAgreementValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const validateAll = () => {
  nameInput.addEventListener("input", validateForm);
  numberInput.addEventListener("input", validateForm);
  agreementInput.addEventListener("change", validateForm);
};

export { form, validateAll };
