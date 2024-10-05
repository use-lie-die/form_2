document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#registration-form");
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordConfirm = document.querySelector("#password-confirm");
  const birthDay = document.querySelector("#birth-day");
  const submitButton = document.querySelector("#form-button");
  
  const namePattern = /^[A-Za-zА-Яа-я]{2,}$/;
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

  const errors = {
    firstName: "Имя должно содержать только буквы и быть не менее 2 символов.",
    lastName: "Фамилия должна содержать только буквы и быть не менее 2 символов.",
    email: "Введите корректный email адрес.",
    password:
      "Пароль должен быть не менее 8 символов, содержать цифру, заглавную и строчную буквы и специальный символ.",
    passwordConfirm: "Пароли не совпадают.",
    birthDay: "Возраст должен быть не менее 18 лет.",
  };

  function validateInput(input, pattern, errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);
    if (!pattern.test(input.value.trim())) {
      input.classList.add("invalid");
      errorElement.textContent = errorMessage;
      errorElement.style.display = "block";
      return false;
    } else {
      input.classList.remove("invalid");
      input.classList.add("valid");
      errorElement.style.display = "none";
      return true;
    }
  }

  function validatePasswordMatch() {
    const errorElement = document.getElementById("password-confirm-error");
    if (password.value !== passwordConfirm.value) {
      passwordConfirm.classList.add("invalid");
      errorElement.textContent = errors.passwordConfirm;
      errorElement.style.display = "block";
      return false;
    } else {
      passwordConfirm.classList.remove("invalid");
      passwordConfirm.classList.add("valid");
      errorElement.style.display = "none";
      return true;
    }
  }

  function validateAge() {
    const birthDate = new Date(birthDay.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const errorElement = document.getElementById("birth-day-error");

    if (age < 18 || (age === 18 && today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()))) {
      birthDay.classList.add("invalid");
      errorElement.textContent = errors.birthDay;
      errorElement.style.display = "block";
      return false;
    } else {
      birthDay.classList.remove("invalid");
      birthDay.classList.add("valid");
      errorElement.style.display = "none";
      return true;
    }
  }

  function checkFormValidity() {
    const isFormValid =
      validateInput(firstName, namePattern, "first-name-error", errors.firstName) &&
      validateInput(lastName, namePattern, "last-name-error", errors.lastName) &&
      validateInput(email, emailPattern, "email-error", errors.email) &&
      validateInput(password, passwordPattern, "password-error", errors.password) &&
      validatePasswordMatch() &&
      validateAge();

    submitButton.disabled = !isFormValid;
  }

  firstName.addEventListener("input", () => validateInput(firstName, namePattern, "first-name-error", errors.firstName));
  lastName.addEventListener("input", () => validateInput(lastName, namePattern, "last-name-error", errors.lastName));
  email.addEventListener("input", () => validateInput(email, emailPattern, "email-error", errors.email));
  password.addEventListener("input", () => validateInput(password, passwordPattern, "password-error", errors.password));
  passwordConfirm.addEventListener("input", validatePasswordMatch);
  birthDay.addEventListener("change", validateAge);

  form.addEventListener("input", checkFormValidity);
});