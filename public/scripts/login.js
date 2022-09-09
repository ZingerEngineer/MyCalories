const password = document.querySelector(".password");
const email = document.querySelector(".email");
const signInButton = document.querySelector(".sign-in");
const visibilityButton = document.querySelector(".visibility");
const buttonIcon = document.getElementsByTagName("i")[1];
let isVisible = false;
let user = {};
const signIn = async () => {
  user["email"] = email.value;
  user["password"] = password.value;
  loginData = { ...user };
  try {
    const res = await axios.post("/api/public/auth/login", loginData);
    const token = res.headers.authorization;
    localStorage.setItem("token", token);
    window.location.assign("/");
  } catch (error) {
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
  }
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
