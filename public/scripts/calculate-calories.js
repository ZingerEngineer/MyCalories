const submitButton = document.querySelector(".submit-button");
const container = document.querySelector(".container");
const rowsWrapper = document.querySelector(".rows-wrapper");
const totalCalories = document.querySelector(".total-calories");
const positiveNumberRegEx = new RegExp(
  "^(?!(?:^[-+]?[0.]+(?:[]|$)))(?!(?:^-))(?:(?:[+-]?)(?=[0123456789.])(?:(?:(?:[0123456789]+)(?:(?:[.])(?:[0123456789]*))?|(?:(?:[.])(?:[0123456789]+))))(?:(?:[])(?:(?:[+-]?)(?:[0123456789]+))|))$"
);
let invalidChars = ["-", "+", "e"];
let isEmpty = null;
let isReadyToCalculate = null
let productsDataList = [];
let productInfoObject = { select: null, grams: 0,calories:0};
const rowInputsCheck = ()=>{

}
const sumOfArray = (array) =>{
  let sum = 0
  for(i=0;i<array.length;i++){
    sum = array[i].calories + sum
  }
  return sum;
}
const deleteRow = (array,index,wrapper)=>{
  array.splice(index,1)
totalCalories.innerText = sumOfArray(array)
wrapper.innerHTML = ""
render()
}
const deleteButtonCreate = (index) => {
  const deleteIcon = document.createElement("I");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("card-button");
  deleteButton.setAttribute("id", `delete-button-${index}`);
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const rowSelectBoxCreate = (index) => {
  const rowSelectBox = document.createElement("select");
  rowSelectBox.setAttribute("name", "products-box");
  rowSelectBox.setAttribute("class", "row-select-box");
  rowSelectBox.setAttribute("id", `row-select-box-${index}`);
  return rowSelectBox;
};
const optionsCreate = (
  productName,
  productKiloCaloryPerGram,
  productId,
  rowSelectBox
) => {
  const option = document.createElement("option");
  option.setAttribute("value", productKiloCaloryPerGram);
  option.setAttribute("id", productId);
  option.innerHTML = productName;
  rowSelectBox.appendChild(option);
};
const rowGramsInputCreate = (index) => {
  const gramsInput = document.createElement("input");
  gramsInput.classList.add("grams-input");
  gramsInput.setAttribute("type", "number");
  gramsInput.setAttribute("onpaste", "return false");
  gramsInput.setAttribute("id", `grams-input-${index}`);
  gramsInput.addEventListener("keydown", function (character) {
    if (invalidChars.includes(character.key)) {
      character.preventDefault();
    }
  });
  return gramsInput;
};
const singleRowCaloriesCreate = (index) => {
  const singleRowCalories = document.createElement("label");
  singleRowCalories.classList.add("calories");
  singleRowCalories.setAttribute("id", `row-calories-${index}`);
  return singleRowCalories;
};
const rowInfoWrapperCreate = (selectBox, gramsInput, calories,index) => {
  const rowInfoWrapper = document.createElement("DIV");
  rowInfoWrapper.classList.add("product-info");
  rowInfoWrapper.setAttribute("id",`row-info-wrapper-${index}`)
  rowInfoWrapper.appendChild(selectBox);
  rowInfoWrapper.appendChild(gramsInput);
  rowInfoWrapper.appendChild(calories);
  return rowInfoWrapper;
};

const productRowCreate = (wrapper, deleteButton,index) => {
  const productRow = document.createElement("DIV");
  productRow.appendChild(wrapper);
  productRow.appendChild(deleteButton);
  productRow.classList.add("product-row");
  productRow.setAttribute("id",`product-row-${index}`)
  return productRow;
};
const render = () => {
  rowsWrapper.innerHTML = "";
  productsDataList.forEach((productDataObject, index) => {
    const rowSelectBoxElement = rowSelectBoxCreate(index);
    optionsCreate("Select product", null, "select", rowSelectBoxElement);
    products.forEach((obj) => {
      const objId = obj._id;
      const objName = obj.name;
      const objCals = obj.kCaloryPerGm;
      options = optionsCreate(objName, objCals, objId, rowSelectBoxElement);
    });
    rowSelectBoxElement.value = productDataObject.select;
    const gramsInputElement = rowGramsInputCreate(index);
    gramsInputElement.value = productDataObject.grams;
    const singleRowCaloriesElement = singleRowCaloriesCreate(index);
    singleRowCaloriesElement.innerText = productDataObject.calories
    gramsInputElement.addEventListener("input", () => {
      productsDataList[index].grams = gramsInputElement.value;
      if (!rowSelectBoxElement.value) {
        singleRowCaloriesElement.innerHTML = "Select a product.";
      } else {
        productDataObject.calories = parseInt((productDataObject.select * productDataObject.grams).toFixed(3)) || 0;
          totalCalories.innerText = sumOfArray(productsDataList)
      }
      render();
    });
    rowSelectBoxElement.addEventListener("change", () => {
      productsDataList[index].select = rowSelectBoxElement.value;
      if (!rowSelectBoxElement.value) {
        singleRowCaloriesElement.innerHTML = "Select a product.";
      } else {
        productDataObject.calories = parseInt((productDataObject.select * productDataObject.grams).toFixed(3)) || 0;
        totalCalories.innerText = sumOfArray(productsDataList)
      }
      render();
    });

    let rowInfoWrapperElement = rowInfoWrapperCreate(
      rowSelectBoxElement,
      gramsInputElement,
      singleRowCaloriesElement,
      index
      
    );
    const deleteButtonElement = deleteButtonCreate(index)
    deleteButtonElement.addEventListener("click",()=> deleteRow(productsDataList,index,rowsWrapper))
  
    let productRowElement = productRowCreate(rowInfoWrapperElement,deleteButtonElement,index);
    rowsWrapper.appendChild(productRowElement);
  });
};
window.addEventListener("load", async function () {
  const res = await axios.get("/api/product");
  products = res.data;
  if (products.length === 0) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }
  console.log(isEmpty)
});
submitButton.addEventListener("click", () => {
  if (productsDataList.length != 0) {
    productsDataList.push({...productInfoObject});
    rowsWrapper.innerHTML = "";
    render();
  } else {
    productsDataList.push({...productInfoObject});
    console.log(productsDataList)
    render();
  }
});
