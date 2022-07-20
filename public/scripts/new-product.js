const returnButton = document.querySelector(".return-button");
const addButton = document.querySelector(".add-button");
const positiveNumberRegEx = new RegExp(
  "^(?!(?:^[-+]?[0.]+(?:[]|$)))(?!(?:^-))(?:(?:[+-]?)(?=[0123456789.])(?:(?:(?:[0123456789]+)(?:(?:[.])(?:[0123456789]*))?|(?:(?:[.])(?:[0123456789]+))))(?:(?:[])(?:(?:[+-]?)(?:[0123456789]+))|))$"
);
const wordRegEx = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð' -]+$/u
);
let inputName = document.querySelector(".name-input");
let inputCalory = document.querySelector(".calory-input");
let isPositive = false;
let isProduct = false;
let invalidChars = ["-", "+", "e"];

inputCalory.addEventListener("keydown", function (character) {
  if (invalidChars.includes(character.key)) {
    character.preventDefault();
  }
});
const wordCheck = () => {
  if (
    wordRegEx.test(inputName.value) &&
    /^\s/.test(inputName.value) === false &&
    inputName.value != ""
  ) {
    isProduct = true;
  } else {
    isProduct = false;
  }
};
const positiveCheck = () => {
  if (positiveNumberRegEx.test(inputCalory.value)) {
    isPositive = true;
  } else {
    isPositive = false;
  }
};
inputName.addEventListener("input", wordCheck);
inputCalory.addEventListener("input", positiveCheck);

returnButton.addEventListener("click", async () => {
  window.location.replace("/");
});

addButton.addEventListener("click", async () => {
  if (isPositive === true && isProduct === true) {
    try {
      let inputName = document.querySelector(".name-input").value;
      let inputCalory = document.querySelector(".calory-input").value;
      let data = {};

      data = {
        name: inputName,
        kCaloryPerGm: inputCalory,
      };
      await axios.post("/api/product/", data);
      Toastify({
        text: "Product added",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
        },
      }).showToast();
    } catch (error) {
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
  }else{
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
});
