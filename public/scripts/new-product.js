const returnButton = document.querySelector(".return-button");
const addButton = document.querySelector(".add-button");

returnButton.addEventListener("click", async () => {
  window.location.replace("/");
});

addButton.addEventListener("click", async () => {
  try {
    const data = {};
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
});
