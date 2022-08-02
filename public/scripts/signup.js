const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector(".input-email");
const password = document.querySelector(".input-password");
const confirmPassword = document.querySelector(".input-confirm");
const visButton = document.querySelector(".visibility");
const buttonSignUp = document.querySelector(".sign-up-button");
const eightCharacters = document.querySelector("#eight-characters");
const oneSpecial = document.querySelector("#special-character");
const upperCase = document.querySelector("#upper-case");
const lowerCase = document.querySelector("#lower-case");
const digits = document.querySelector("#digits");
const buttonIcon = document.getElementsByTagName("i")[0];
const emailReg = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const firstNameReg = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);
const lastNameReg = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);
const passwordReg = new RegExp(
  /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/
);
const specialReg = new RegExp(/^.*(?=.*[!#$%&?@ "]).*$/);
const upperReg = new RegExp(/^.*(?=.*[A-Z]).*$/);
const lowerReg = new RegExp(/^.*(?=.*[a-z]).*$/);
const numbersReg = new RegExp(/^.*(?=.*\d).*$/);
let isVisible = false;
let validFirstName = null;
let validLastName = null;
let validEmail = null;
let validPassowrd = null;
let validConfirm = null;
let validSignUp = null;
let isEightCharacters = null;
let hasSpecial = null;
let hasUpperCase = null;
let hasLowerCase = null;
let hasDigit = null;

const visibility = () => {
  if (isVisible === false) {
    password.type = "text";
    buttonIcon.classList.remove("fas", "fa-eye");
    buttonIcon.classList.add("fas", "fa-eye-slash");
    isVisible = true;
  } else if (isVisible === true) {
    password.type = "password";
    buttonIcon.classList.remove("fas", "fa-eye-slash");
    buttonIcon.classList.add("fas", "fa-eye");
    isVisible = false;
  }
};

const passwordLength = () => {
  if (password.value.length >= 8) {
    eightCharacters.classList.remove("inValid");
    eightCharacters.classList.add("valid");
    isEightCharacters = true;
  } else if (password.value.length < 8) {
    eightCharacters.classList.remove("valid");
    eightCharacters.classList.add("inValid");
    isEightCharacters = false;
  }
};

const passwordSpecialCharacter = () => {
  if (specialReg.test(password.value) == false) {
    oneSpecial.classList.remove("valid");
    oneSpecial.classList.add("inValid");
    hasSpecial = false;
  } else if (specialReg.test(password.value) == true) {
    oneSpecial.classList.remove("inValid");
    oneSpecial.classList.add("valid");
    hasSpecial = true;
  }
};

const passwordUpperCase = () => {
  if (upperReg.test(password.value) == false) {
    upperCase.classList.remove("valid");
    upperCase.classList.add("inValid");
    hasUpperCase = false;
  } else if (upperReg.test(password.value) == true) {
    upperCase.classList.remove("inValid");
    upperCase.classList.add("valid");
    hasUpperCase = true;
  }
};
const passwordLowerCase = () => {
  if (lowerReg.test(password.value) == false) {
    lowerCase.classList.remove("valid");
    lowerCase.classList.add("inValid");
    hasLowerCase = false;
  } else if (lowerReg.test(password.value) == true) {
    lowerCase.classList.remove("inValid");
    lowerCase.classList.add("valid");
    hasLowerCase = true;
  }
};

const passwordDigits = () => {
  if (numbersReg.test(password.value) == false) {
    digits.classList.remove("valid");
    digits.classList.add("inValid");
    hasDigit = false;
  } else if (numbersReg.test(password.value) == true) {
    digits.classList.remove("inValid");
    digits.classList.add("valid");
    hasDigit = true;
  }
};

const passwordValidation = () => {
  if (
    isEightCharacters == true &&
    hasSpecial == true &&
    hasUpperCase == true &&
    hasLowerCase == true &&
    hasDigit == true
  ) {
    validPassowrd = true;
  } else {
    validPassowrd = false;
  }
};

const firstNameValidation = () => {
  if (firstNameReg.test(firstName.value) === true) {
    firstName.classList.remove("inputInValid");
    firstName.classList.add("inputValid");
    validFirstName = true;
  } else if (firstNameReg.test(firstName.value) === false) {
    firstName.classList.remove("inputValid");
    firstName.classList.add("inputInValid");
    validFirstName = false;
  }
};

const lastNameValidation = () => {
  if (lastNameReg.test(lastName.value) === true) {
    lastName.classList.remove("inputInValid");
    lastName.classList.add("inputValid");
    validLastName = true;
  } else if (lastNameReg.test(lastName.value) === false) {
    lastName.classList.remove("inputValid");
    lastName.classList.add("inputInValid");
    validLastName = false;
  }
};

const emailValidation = () => {
  if (emailReg.test(email.value) === true) {
    email.classList.remove("inputInValid");
    email.classList.add("inputValid");
    validEmail = true;
  } else if (emailReg.test(email.value) === false) {
    email.classList.remove("inputValid");
    email.classList.add("inputInValid");
    validEmail = false;
  }
};

const confirmation = () => {
  if (confirmPassword.value == password.value && password.value != "") {
    validConfirm = true;
    confirmPassword.classList.remove("inputInValid");
    confirmPassword.classList.add("inputValid");
  } else {
    validConfirm = false;
    confirmPassword.classList.remove("inputValid");
  }
};

const signUpValidity = () => {
  if (
    validFirstName == true &&
    validLastName == true &&
    validEmail == true &&
    validPassowrd == true &&
    validConfirm == true
  ) {
    validSignUp = true;
    buttonSignUp.removeAttribute("disabled");
  } else {
    buttonSignUp.setAttribute("disabled", "true");
    validSignUp = false;
  }
};

const signUp = async () => {
  if (validSignUp === true) {
    try {
      let userData = {};
      let inputFirstName = document.querySelector("#first-name").value;
      let inputLastName = document.querySelector("#last-name").value;
      let inputEmail = document.querySelector(".input-email").value;
      let inputPassword = document.querySelector(".input-password").value;

      userData = {
        firstName: inputFirstName,
        lastName: inputLastName,
        email: inputEmail,
        password: inputPassword,
      };
      await axios.post("/api/user/", userData);
      Toastify({
        text: "User created",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
        },
      }).showToast();
      window.location.replace("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error happened",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, red, red)",
        },
      }).showToast();
    }
  } else {
    Toastify({
      text: "Invalid input",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, red, red)",
      },
    }).showToast();
    console.log(user);
  }
};

visButton.addEventListener("click", visibility);
firstName.addEventListener("input", firstNameValidation);
lastName.addEventListener("input", lastNameValidation);
email.addEventListener("input", emailValidation);
password.addEventListener("input", passwordLength);
password.addEventListener("input", passwordSpecialCharacter);
password.addEventListener("input", passwordUpperCase);
password.addEventListener("input", passwordLowerCase);
password.addEventListener("input", passwordDigits);
password.addEventListener("input", passwordValidation);
password.addEventListener("input", confirmation);
confirmPassword.addEventListener("input", passwordValidation);
confirmPassword.addEventListener("input", confirmation);
firstName.addEventListener("input", signUpValidity);
lastName.addEventListener("input", signUpValidity);
email.addEventListener("input", signUpValidity);
password.addEventListener("input", signUpValidity);
confirmPassword.addEventListener("input", signUpValidity);
buttonSignUp.addEventListener("click", signUp);
