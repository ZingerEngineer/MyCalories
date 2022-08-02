const password = document.querySelector(".password");
const email = document.querySelector(".email");
const signInButton = document.querySelector(".sign-in");
const visibilityButton = document.querySelector(".visibility");
const buttonIcon = document.getElementsByTagName("i")[1];
let isVisible = false;
let user = {};
let signIn = () => {
  let textPassword = (user["email"] = email.value);
  user["password"] = password.value;
  console.log(user);
};
signInButton.addEventListener("click", signIn);
const visibility = () => {
  if (isVisible === false) {
    password.removeAttribute("type");
    password.setAttribute("type", "text");
    buttonIcon.removeAttribute("class");
    buttonIcon.setAttribute("class", "fas fa-eye-slash");
    isVisible = true;
  } else if (isVisible === true) {
    password.removeAttribute("type");
    password.setAttribute("type", "password");
    buttonIcon.removeAttribute("class");
    buttonIcon.setAttribute("class", "fas fa-eye");
    isVisible = false;
  }
};
visibilityButton.addEventListener("click", visibility);
