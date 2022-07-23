const productList = document.querySelector(".product-list");
const createButton = document.querySelector(".btn-1");

const nameInputEditCreate = () => {
  const inputNameEdit = document.createElement("INPUT");
  inputNameEdit.setAttribute("type", "text");
  inputNameEdit.setAttribute("class", "input-name-edit");
};

const calsInputEditCreate = () => {
  const inputCalsEdit = document.createElement("INPUT");
  inputCalsEdit.setAttribute("type", "number");
  inputCalsEdit.setAttribute("class", "input-cals-edit");
};

const confirmButtonCreate = () => {
  const confirmIcon = document.createElement("I");
  confirmIcon.classList.add("fa-solid", "fa-square-check");
  const confirmButton = document.createElement("BUTTON");
  confirmButton.classList.add("confirm-button");
  confirmButton.appendChild(confirmIcon);
  confirmButton.addEventListener("click", async () => {
    try {
      let data = {};
      data = {
        name: inputNameEdit.value,
        kCaloryPerGm: inputCalsEdit.value,
      };
      await axios.put(`/api/product/${product.id}`, data);
      Toastify({
        text: "Product edited",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
        },
      }).showToast();
      inputNameEdit.remove();
      inputCalsEdit.remove();
      productNameCreate();
      productCalsCreate();
      productInfoCreate();
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
};
const deleteButtonCreate = () => {
  const deleteIcon = document.createElement("I");
  deleteIcon.classList.add("fa-solid", "fa-square-xmark");
  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", async (objName) => {
    try {
      swal({
        title: "Are you sure ?",
        text: `Do you want to delete ${objName}`,
        icon: "warning",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal(`${objName} is deleted.`, {
            icon: "success",
          });
          deleteProduct();
        } else {
          swal("Delete canceled.");
        }
      });
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
};
const editButtonCreate = () => {
  const editIcon = document.createElement("I");
  editIcon.classList.add("fa-solid", "fa-square-pen");
  const editButton = document.createElement("BUTTON");
  editButton.classList.add("edit-button");
  editButton.appendChild(editIcon);
  editButton.addEventListener("click", () => {
    editButton.remove();
    productName.remove();
    productCals.remove();
    nameInputEditCreate();
    calsInputEditCreate();
    productInfo.appendChild(inputNameEdit);
    productInfo.appendChild(inputCalsEdit);
    confirmButtonCreate();
    productButtons.appendChild(confirmButton);
  });
};

const productButtonsCreate = (deleteButton,editButton) => {
  const productButtons = document.createElement("DIV");
  productButtons.classList.add("product-buttons");
  productButtons.appendChild(deleteButton);
  productButtons.appendChild(editButton);
};
const productNameCreate = (objName) => {
  const productName = document.createElement("P");
  productName.classList.add("product-name");
  productName.innerText = objName;
};
const productCalsCreate = (objCals) => {
  const productCals = document.createElement("P");
  productCals.classList.add("product-Kcalgm");
  productCals.innerText = objCals;
};
const productInfoCreate = (productName,productCals) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  productInfo.appendChild(productName);
  productInfo.appendChild(productCals);
};

const productCreate = (objId) => {
  const product = document.createElement("DIV");
  product.appendChild(productInfo);
  product.appendChild(productButtons);
  product.classList.add("product");
  product.id = objId;
};

const deleteProduct = async (objId) => {
  await axios.delete(`/api/product/${objId}`);
  product.remove();
};

window.addEventListener("load", async () => {
  const res = await axios.get("/api/product");
  let productArray = res.data;
  productArray.forEach((obj) => {
    let objId = obj._id;
    let objName = obj.name;
    let objCals = obj.kCaloryPerGm;

    productNameCreate(objName);
    productCalsCreate(objCals);
    productInfoCreate(productName,productCals);
    editButtonCreate();
    deleteButtonCreate();
    productButtonsCreate();
    productCreate(objId);
    productList.appendChild(product);
    productList.appendChild(product);
  });
});

createButton.addEventListener("click", () => {
  window.location.assign("/pages/new-product.html");
});
const editButton = document.querySelector(".edit-button");

const deleteButton = document.querySelector(".delete-button");
