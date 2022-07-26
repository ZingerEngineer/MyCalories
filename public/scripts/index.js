const productList = document.querySelector(".product-list");
const createButton = document.querySelector(".btn-1");

const nameInputEditCreate = () => {
  const inputNameEdit = document.createElement("INPUT");
  inputNameEdit.classList.add("input-name-edit")
  inputNameEdit.setAttribute("type", "text");
  inputNameEdit.setAttribute("class", "input-name-edit");
  return inputNameEdit;
};

const calsInputEditCreate = () => {
  const inputCalsEdit = document.createElement("INPUT");
  inputCalsEdit.classList.add("input-cals-edit")
  inputCalsEdit.setAttribute("type", "number");
  inputCalsEdit.setAttribute("class", "input-cals-edit");
  return inputCalsEdit
};

const confirmButtonCreate = () => {
  const confirmIcon = document.createElement("I");
  confirmIcon.classList.add("fa-solid", "fa-square-check");
  const confirmButton = document.createElement("BUTTON");
  confirmButton.classList.add("confirm-button");
  confirmButton.appendChild(confirmIcon);
    return confirmButton;
};

const deleteProduct = async (objId) => {
  res = await axios.delete(`/api/product/${objId}`);
  let productCard = document.getElementById(objId);
  productCard.remove();
};
const deleteButtonCreate = (objName, objId) => {
  const deleteIcon = document.createElement("I");
  deleteIcon.classList.add("fa-solid", "fa-square-xmark");
  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
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
const editButtonCreate = () => {
  const editIcon = document.createElement("I");
  editIcon.classList.add("fa-solid", "fa-square-pen");
  const editButton = document.createElement("BUTTON");
  editButton.classList.add("edit-button");
  editButton.appendChild(editIcon);
  return editButton;
};

const productButtonsCreate = (deleteButton, editButton) => {
  const productButtons = document.createElement("DIV");
  productButtons.classList.add("product-buttons");
  productButtons.appendChild(deleteButton);
  productButtons.appendChild(editButton);
  return productButtons;
};
const productNameCreate = (name) => {
  const productName = document.createElement("P");
  productName.classList.add("product-name");
  productName.innerText = name;
  return productName;
};
const productCalsCreate = (cals) => {
  const productCals = document.createElement("P");
  productCals.classList.add("product-Kcalgm");
  productCals.innerText = cals;
  return productCals;
};
const productInfoCreate = (productName, productCals) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
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
  let res = await axios.get("/api/product");
  let productArray = res.data;
  productArray.forEach((obj) => {
    let objId = obj._id;
    let objName = obj.name;
    let objCals = obj.kCaloryPerGm;

    let productNameElement = productNameCreate(objName);
    let productCalsElement = productCalsCreate(objCals);
    let productInfoElement = productInfoCreate(
      productNameElement,
      productCalsElement
    );
    
    const editButtonElement = editButtonCreate();
    const deleteButtonElement = deleteButtonCreate(objName, objId);
    const productButtonsElement = productButtonsCreate(
      editButtonElement,
      deleteButtonElement
    );
    editButtonElement.addEventListener("click", editFunction =() => {
      editButtonElement.remove();
      productNameElement.remove();
      productCalsElement.remove();
      const inputNameEditElement = nameInputEditCreate()
      const inputCalsEditElement = calsInputEditCreate()
      productInfoElement.appendChild(inputNameEditElement);
      productInfoElement.appendChild(inputCalsEditElement);
      const confirmButtonElement = confirmButtonCreate();
      confirmButtonElement.addEventListener("click", async () => {
        try {
          let editedProduct = {};
          editedProduct = {
            name: inputNameEditElement.value,
            kCaloryPerGm: inputCalsEditElement.value,
          };
           await axios.put(`/api/product/${objId}`, editedProduct, {new: true});
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
          let name = editedProduct.name
          let cals = editedProduct.kCaloryPerGm
            let productNameElement = productNameCreate(name)
            let productCalsElement = productCalsCreate(cals)
            inputNameEditElement.remove()
            inputCalsEditElement.remove()
            productInfoElement.appendChild(productNameElement)
            productInfoElement.appendChild(productCalsElement)
            confirmButtonElement.remove()
            const editButtonElement = editButtonCreate()
            productButtonsElement.insertBefore(editButtonElement,deleteButtonElement)

        } catch (error) {
          console.log(error)
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
    });
    
    const productElement = productCreate(
      objId,
      productInfoElement,
      productButtonsElement
    );
    productList.appendChild(productElement);
  });
});

createButton.addEventListener("click", () => {
  window.location.assign("/pages/new-product.html");
});
const editButton = document.querySelector(".edit-button");

const deleteButton = document.querySelector(".delete-button");
