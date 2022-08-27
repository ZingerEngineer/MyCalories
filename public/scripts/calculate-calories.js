const submitButton = document.querySelector(".submit-button");
const productSelectBox = document.querySelector("#products-box");
const container = document.querySelector(".container");
const productsWrapper = document.querySelector(".products-wrapper");
const totalCalories = document.querySelector(".total-calories");
let isEmpty = null;
let productsInfoList = [];
productsInfoList
let productCreationInfo = { select: null, grams: 0,calories:0};
const arraySum = (array) =>{
  let sum = 0
  for(i=0;i<array.length;i++){
    sum = array[i].calories + sum
  }
  return sum;
}
const deleteProduct = (id,array,productWrapper)=>{
  array = array.splice(id,id+1)
productWrapper.innerHTML = ""
renderer()
}
const deleteButtonCreate = (index) => {
  const deleteIcon = document.createElement("I");
  deleteIcon.classList.add("fa-solid", "fa-trash");
  const deleteButton = document.createElement("BUTTON");
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("card-button");
  deleteButton.setAttribute("id", `${index}-delete-button`);
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const selectBoxCreate = () => {
  const selectBox = document.createElement("select");
  selectBox.setAttribute("name", "products-box");
  selectBox.setAttribute("id", "products-box");
  return selectBox;
};
const optionsCreate = (
  productNameValue,
  productCalsValue,
  productIdValue,
  productSelectBox
) => {
  const option = document.createElement("option");
  option.setAttribute("value", productCalsValue);
  option.setAttribute("id", productIdValue);
  option.innerHTML = productNameValue;
  productSelectBox.appendChild(option);
};
const inputGramsCreate = () => {
  const inputGrams = document.createElement("input");
  inputGrams.classList.add("input-grams");
  inputGrams.setAttribute("type", "number");
  return inputGrams;
};
const singleProductCaloriesCreate = () => {
  const singleProductCalories = document.createElement("label");
  singleProductCalories.classList.add("calories");
  singleProductCalories.innerText = "Select a product.";
  return singleProductCalories;
};
const productInputWrapperCreate = (selectBox, inputGrams, calories, deleteButton) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  //product.setAttribute("id",`product-info-${id}`)
  productInfo.appendChild(selectBox);
  productInfo.appendChild(inputGrams);
  productInfo.appendChild(calories);
  return productInfo;
};

const productCreate = (productInputWrapper, deleteButton) => {
  const product = document.createElement("DIV");
  product.appendChild(productInputWrapper);
  product.appendChild(deleteButton);
  product.classList.add("product");
  //product.setAttribute("id",`product-${id}`)
  return product;
};
const renderer = () => {
  productsWrapper.innerHTML = "";
  productsInfoList.forEach((dataObject, index) => {
    const productSelectBoxElement = selectBoxCreate();
    optionsCreate("Select product", null, "select", productSelectBoxElement);
    products.forEach((obj) => {
      const objId = obj._id;
      const objName = obj.name;
      const objCals = obj.kCaloryPerGm;
      options = optionsCreate(objName, objCals, objId, productSelectBoxElement);
    });
    productSelectBoxElement.value = dataObject.select;
    const inputGramsElement = inputGramsCreate(index);
    inputGramsElement.value = dataObject.grams;
    const singleProductCaloriesElement = singleProductCaloriesCreate();
    singleProductCaloriesElement.innerText = dataObject.calories
    inputGramsElement.addEventListener("input", (e) => {
      productsInfoList[index].grams = inputGramsElement.value;
      if (!productSelectBoxElement.value) {
        singleProductCaloriesElement.innerHTML = "Select a product.";
      } else {
          dataObject.calories = (dataObject.select * dataObject.grams) || 0;
          totalCalories.innerText = arraySum(productsInfoList)
      }
      renderer();
    });
    productSelectBoxElement.addEventListener("change", (event) => {
      productsInfoList[index].select = productSelectBoxElement.value;
      if (!productSelectBoxElement.value) {
        singleProductCaloriesElement.innerHTML = "Select a product.";
      } else {
        dataObject.calories = (dataObject.select * dataObject.grams) || 0;
        totalCalories.innerText = arraySum(productsInfoList)
      }
      renderer();
    });

    let productInputWrapperElement = productInputWrapperCreate(
      productSelectBoxElement,
      inputGramsElement,
      singleProductCaloriesElement,
      
    );
    const deleteButtonElement = deleteButtonCreate(index)
    deleteButtonElement.addEventListener("click",()=> deleteProduct(index,productsInfoList,productInputWrapperElement))
  
    let productElement = productCreate(productInputWrapperElement,deleteButtonElement);
    productsWrapper.appendChild(productElement);
  });
};
window.addEventListener("load", async function () {
  const res = await axios.get("/api/product");
  products = res.data;
  console.log(products);
  if (products.length === 0) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }
});
submitButton.addEventListener("click", () => {
  if (productsInfoList.length != 0) {
    productsInfoList.push({...productCreationInfo});
    let toBeEmptied = document.querySelector(".products-wrapper");
    toBeEmptied.innerHTML = "";
    renderer();
  } else {
    productsInfoList.push({...productCreationInfo});
    renderer();
  }
});
