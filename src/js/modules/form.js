const form = document.querySelector("#constructor");

const selectInput = form.querySelector("#form-material");

const optionsContainer = form.querySelector("#form-use");
const optionsPositions = optionsContainer.querySelector(".form__checkbox");

const descriptionInput = form.querySelector("#form-description");
const nameInput = form.querySelector("#form-name");
const nameError = form.querySelector("#form-name-error");
const numberInput = form.querySelector("#form-number");
const agreementInput = form.querySelector("#form-agree");

const submitButton = form.querySelector("#form-submit");

const validateInput = (input, error) => {
  const pattern = new RegExp(input.pattern);
  if (!pattern.test(input.value)) {
    error.style.display = "flex";
    input.classList.add("form-control_error");
    return false;
  } else {
    error.style.display = "none";
    input.classList.remove("form-control_error");
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

const validateForm = () => {
  const isNameValid = validateNameInput();
  const isAgreementValid = agreementInput.checked;

  console.log(isNameValid, isAgreementValid, submitButton.disabled)

  if (isNameValid && isAgreementValid) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const validateAll = () => {
  nameInput.addEventListener("input", validateForm);
  agreementInput.addEventListener("change", validateForm);
};

export { form, validateAll };
