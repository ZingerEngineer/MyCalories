const productList = document.querySelector(".product-list");
const createButton = document.querySelector(".btn-1");
const positiveNumberRegEx = new RegExp(
  "^(?!(?:^[-+]?[0.]+(?:[]|$)))(?!(?:^-))(?:(?:[+-]?)(?=[0123456789.])(?:(?:(?:[0123456789]+)(?:(?:[.])(?:[0123456789]*))?|(?:(?:[.])(?:[0123456789]+))))(?:(?:[])(?:(?:[+-]?)(?:[0123456789]+))|))$"
);
const wordRegEx = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð' -]+$/u
);
let isPositive = false;
let isProduct = false;
let invalidChars = ["-", "+", "e"];
const wordCheck = (inputNameEditElement) => {
  if (
    wordRegEx.test(inputNameEditElement.value) &&
    /^\s/.test(inputNameEditElement.value) === false &&
    inputNameEditElement.value != ""
  ) {
    isProduct = true;
  } else {
    isProduct = false;
  }
  console.log(isProduct)
};
const positiveCheck = (inputCalsEditElement) => {
  if (positiveNumberRegEx.test(inputCalsEditElement.value)) {
    isPositive = true;
  } else {
    isPositive = false;
  }
  console.log(isPositive)
};

const nameInputEditCreate = (nameInputEditId,value) => {
  const inputNameEdit = document.createElement("INPUT");
  inputNameEdit.classList.add("input-name-edit");
  inputNameEdit.setAttribute("type", "text");
  inputNameEdit.setAttribute("class", "input-name-edit");
  inputNameEdit.setAttribute("id", `${nameInputEditId}-name-input-edit`);
  inputNameEdit.setAttribute("value", value);


  return inputNameEdit;
};

const calsInputEditCreate = (calsInputEditId,value) => {
  const inputCalsEdit = document.createElement("INPUT");
  inputCalsEdit.classList.add("input-cals-edit");
  inputCalsEdit.setAttribute("type", "number");
  inputCalsEdit.setAttribute("class", "input-cals-edit");
  inputCalsEdit.setAttribute("id", `${calsInputEditId}-cals-input-edit`);
  inputCalsEdit.setAttribute("value", value);


  return inputCalsEdit;
};

const confirmButtonCreate = (confirmButtonId) => {
  const confirmIcon = document.createElement("I");
  confirmIcon.classList.add("fa-solid", "fa-square-check");
  const confirmButton = document.createElement("BUTTON");
  confirmButton.setAttribute("id", `${confirmButtonId}-confirm-button`);
  confirmButton.classList.add("confirm-button");
  confirmButton.appendChild(confirmIcon);
  return confirmButton;
};

const deleteProduct = async (objId) => {
  res = await axios.delete(`/api/product/${objId}`);
  let productCard = document.getElementById(objId);
  productCard.remove();
};
const deleteButtonCreate = (objName, objId, deleteButtonId) => {
  const deleteIcon = document.createElement("I");
  deleteIcon.classList.add("fa-solid", "fa-square-xmark");
  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("id", `${deleteButtonId}-delete-button`);
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", async () => {
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
          deleteProduct(objId);
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
  return deleteButton;
};
const editButtonCreate = (editButtonId) => {
  const editIcon = document.createElement("I");
  editIcon.classList.add("fa-solid", "fa-square-pen");
  const editButton = document.createElement("BUTTON");
  editButton.classList.add("edit-button");
  editButton.setAttribute("id", `${editButtonId}-edit-button`);
  editButton.appendChild(editIcon);
  return editButton;
};

const productButtonsCreate = (deleteButton, editButton, productButtonsId) => {
  const productButtons = document.createElement("DIV");
  productButtons.classList.add("product-buttons");
  productButtons.setAttribute("id", `${productButtonsId}-product-buttons`);
  productButtons.appendChild(deleteButton);
  productButtons.appendChild(editButton);
  return productButtons;
};
const productNameCreate = (name, productNameId) => {
  const productName = document.createElement("P");
  productName.classList.add("product-name");
  productName.setAttribute("id", `${productNameId}-product-name`);
  productName.innerText = name;
  return productName;
};
const productCalsCreate = (cals, productCalsId) => {
  const productCals = document.createElement("P");
  productCals.classList.add("product-Kcalgm");
  productCals.setAttribute("id", `${productCalsId}-product-cals`);
  productCals.innerText = cals;
  return productCals;
};
const productInfoCreate = (productName, productCals, productInfoId) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  productInfo.setAttribute("id", `${productInfoId}-product-info`);
  productInfo.appendChild(productName);
  productInfo.appendChild(productCals);
  return productInfo;
};

const productCreate = (objId, productInfo, productButtons) => {
  const product = document.createElement("DIV");
  product.appendChild(productInfo);
  product.appendChild(productButtons);
  product.classList.add("product");
  product.id = objId;
  return product;
};

window.addEventListener("load", async function renderer() {
  const res = await axios.get("/api/product");
  const productArray = res.data;
  productArray.forEach((obj) => {
    const objId = obj._id;
    const objName = obj.name;
    const objCals = obj.kCaloryPerGm;
    const deleteButtonId = objId;
    const editButtonId = objId;
    const productCalsId = objId;
    const productNameId = objId;
    const productInfoId = objId;
    const productButtonsId = objId;
    let productNameElement = productNameCreate(objName, productNameId);
    let productCalsElement = productCalsCreate(objCals, productCalsId);
    const productInfoElement = productInfoCreate(
      productNameElement,
      productCalsElement,
      productInfoId
    );

    const editButtonElement = editButtonCreate(editButtonId);
    const deleteButtonElement = deleteButtonCreate(
      objName,
      objId,
      deleteButtonId
    );
    const productButtonsElement = productButtonsCreate(
      editButtonElement,
      deleteButtonElement,
      productButtonsId
    );

    const editFunction = (productElement) => {
      let productName = document.getElementById(`${productNameId}-product-name`)
      let productCals = document.getElementById(`${productCalsId}-product-cals`)
      let inputNameEditElement = nameInputEditCreate(productElement.id,productName.innerText);

      let inputCalsEditElement = calsInputEditCreate(productElement.id,productCals.innerText);
      inputCalsEditElement.addEventListener("keydown", function (character) {
        if (invalidChars.includes(character.key)) {
          character.preventDefault();
        }
      });
      let toBeDeletedEditButton = document.getElementById(
        `${productElement.id}-edit-button`
      );
      toBeDeletedEditButton.remove();
      let tobeDeletedProductName = document.getElementById(`${productElement.id}-product-name`)
      let tobeDeletedProductCals = document.getElementById(`${productElement.id}-product-cals`)
      tobeDeletedProductName.remove();
      tobeDeletedProductCals.remove();

      productInfoElement.appendChild(inputNameEditElement);
      productInfoElement.appendChild(inputCalsEditElement);
      let toBeAddedInputNameEdit = document.getElementById(`${productElement.id}-name-input-edit`)
      toBeAddedInputNameEdit.addEventListener("input",()=>wordCheck(inputNameEditElement))

      let toBeAddedInputCalsEdit = document.getElementById(`${productElement.id}-cals-input-edit`)
      toBeAddedInputCalsEdit.addEventListener("input",()=> positiveCheck(inputCalsEditElement))


      const confirmButtonElement = confirmButtonCreate(productElement.id);
      confirmButtonElement.addEventListener("click", async () => {
        try {
          let editedProduct = {};
          editedProduct = {
            name: inputNameEditElement.value,
            kCaloryPerGm: inputCalsEditElement.value,
          };
          await axios.put(`/api/product/${objId}`, editedProduct, {
            new: true,
          });
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
          let name = editedProduct.name;
          let cals = editedProduct.kCaloryPerGm;
          let productNameElement = productNameCreate(name, productElement.id);
          let productCalsElement = productCalsCreate(cals, productElement.id);
          const toBeDeletedInputNameEdit = document.getElementById(
            `${productElement.id}-name-input-edit`
          );
          const toBeDeletedInputCalsEdit = document.getElementById(
            `${productElement.id}-cals-input-edit`
          );
          toBeDeletedInputNameEdit.remove();
          toBeDeletedInputCalsEdit.remove();
          productInfoElement.appendChild(productNameElement);
          productInfoElement.appendChild(productCalsElement);
          const toBeDeletedConfirmButton = document.getElementById(
            `${productElement.id}-confirm-button`
          );
          toBeDeletedConfirmButton.remove();
          const editButtonElement = editButtonCreate(productElement.id);
          editButtonElement.addEventListener("click", () => editFunction(productElement));
          const productButtonsElement = document.getElementById(`${productElement.id}-product-buttons`)
          productButtonsElement.insertBefore(
            editButtonElement,
            deleteButtonElement
          );
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
      });
      productButtonsElement.appendChild(confirmButtonElement);
    }

    let productElement = productCreate(
      objId,
      productInfoElement,
      productButtonsElement
    );
    productList.appendChild(productElement);
    editButtonElement.addEventListener(
      "click",
      () => editFunction(productElement)
    );

  });
});

createButton.addEventListener("click", () => {
  window.location.assign("/pages/new-product.html");
});
let editButton = document.querySelector(".edit-button");

let deleteButton = document.querySelector(".delete-button");
