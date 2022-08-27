const submitButton = document.querySelector(".submit-button");
const productSelectBox = document.querySelector("#products-box");
const container = document.querySelector(".container");
const productsWrapper = document.querySelector(".products-wrapper");
const totalCalories = document.querySelector(".total-calories");
let isEmpty = null;
let singleProductInfo = [];
let productCreationInfo = {select:null,grams:0}

const selectBoxCreate = () => {
  const selectBox = document.createElement("select");
  selectBox.setAttribute("name", "products-box");
  selectBox.setAttribute("id", "products-box");
  return selectBox;
};
const optionsCreate = (productNameValue, productCalsValue, productIdValue,productSelectBox) => {
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
  singleProductCalories.innerText= "Select a product."
  return singleProductCalories;
};
const productInputWrapperCreate = (selectBox, inputGrams, calories,id) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  //product.setAttribute("id",`product-info-${id}`)
  productInfo.appendChild(selectBox);
  productInfo.appendChild(inputGrams);
  productInfo.appendChild(calories);
  return productInfo;
};

const productCreate = (productInputWrapper,id) => {
  const product = document.createElement("DIV");
  product.appendChild(productInputWrapper);
  product.classList.add("product");
  //product.setAttribute("id",`product-${id}`)
  return product;
};
const renderer = ()=>{
  singleProductInfo.forEach((dataObject)=>{
    const productSelectBoxElement = selectBoxCreate();
    optionsCreate("Select product", null, "select",productSelectBoxElement);
   products.forEach((obj) => {
     const objId = obj._id;
     const objName = obj.name;
     const objCals = obj.kCaloryPerGm;
     options = optionsCreate(objName, objCals, objId,productSelectBoxElement);
   });
   productSelectBoxElement.value = dataObject.select
   const inputGramsElement = inputGramsCreate();
   inputGramsElement.value = dataObject.grams
   const singleProductCaloriesElement = singleProductCaloriesCreate();
   inputGramsElement.addEventListener("input", () => {
     singleProductInfo[i].grams = inputGramsElement.value
     productElement.remove()
     renderer()
     if (productSelectBoxElement.value === "select") {
       singleProductCaloriesElement.innerHTML = "Select a product.";
     // } else {
     //   singleProductCaloriesElement.innerText = singleProductCalculation(
     //     productSelectBoxElement,
     //     inputGramsElement
     //   )};
      }
   });
   productSelectBoxElement.addEventListener("change", (event) => {
     singleProductInfo[i].select = productSelectBoxElement.value
     productElement.remove()
     renderer()
     if (productSelectBoxElement.value === "select") {
       singleProductCaloriesElement.innerHTML = "Select a product.";
     // } else {
     //   singleProductCaloriesElement.innerText = singleProductCalculation(
     //     productSelectBoxElement,
     //     inputGramsElement
     //   );
     // }
     }
   });
   let productInputWrapperElement = productInputWrapperCreate(
     productSelectBoxElement,
     inputGramsElement,
     singleProductCaloriesElement
   );
   let productElement = productCreate(productInputWrapperElement);
   if (products.length === 0 && isEmpty === false) {
     productElement.remove();
     isEmpty = true;
   }
   productsWrapper.appendChild(productElement);
   console.log(singleProductInfo)
  })
  
}
window.addEventListener("load", async function () {
  const res = await axios.get("/api/product");
  products = res.data;
  console.log(products)
  if (products.length === 0) {
    isEmpty = true;
  } else {
    isEmpty = false;
  }
});
submitButton.addEventListener("click", () => {
  if(singleProductInfo.length > 1){
    for(i=0;i<singleProductInfo.length;i++){
      singleProductInfo.push(productCreationInfo);
      let toBeDeletedProduct = document.querySelector(".product")
      toBeDeletedProduct.remove()
    }
  renderer()
  }else if(singleProductInfo.length === 1){
    singleProductInfo.push(productCreationInfo);
    let toBeDeletedProduct = document.querySelector(".product")
    toBeDeletedProduct.remove()
    renderer()
  }
  else{
    singleProductInfo.push(productCreationInfo);
    renderer()
  }

});
