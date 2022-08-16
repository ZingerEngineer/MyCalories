const submitButton = document.querySelector(".submit-button");
const productSelectBox = document.querySelector("#products-box");
const container = document.querySelector(".container");
const productsContainer = document.querySelector(".products-container")
const totalCalories =document.querySelector(".total-calories")

let isEmpty = null;
let products = [];
const productOptionCreation = (objName, objId, productSelectBoxElement) => {
  let productOption = document.createElement("OPTION");
  productOption.setAttribute("id", objId);
  productOption.innerText = objName;
  productSelectBoxElement.appendChild(productOption);
};
window.addEventListener("load", async function renderer() {
  const res = await axios.get("/api/product");
  products = res.data;
  products.forEach((obj) => {
    const objId = obj._id;
    const objName = obj.name;
    const objCals = obj.kCaloryPerGm;


  });
  if(products.length === 0){
    isEmpty = true
  }else{
    isEmpty = false
  }
});

const selectBoxCreate = () => {
  const selectBox = document.createElement("select");
  selectBox.setAttribute("name", "products-box");
  selectBox.setAttribute("id", "products-box");
  return selectBox;
};
const inputGramsCreate = ()=>{
  const inputGrams = document.createElement("input")
  inputGrams.classList.add("input-grams")
  inputGrams.setAttribute("type","number")

  return inputGrams
}
const caloriesIntakeCreate = ()=>{
  const caloriesintake = document.createElement("label")
  caloriesintake.classList.add("calories")
  caloriesintake.innerHTML = "Enter the quantity."
  return caloriesintake
}
const productInfoCreate = (selectBox,inputGrams,calories) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  productInfo.appendChild(selectBox);
  productInfo.appendChild(inputGrams)
  productInfo.appendChild(calories)
  return productInfo;
};

const productCreate = (productInfo) => {
  const product = document.createElement("DIV");
  product.appendChild(productInfo);
  product.classList.add("product");
  return product;
};
const optionsCreate = (productNameValue,productCalsValue,productIdValue)=>{
  const option = document.createElement("option");
  option.setAttribute("value",productCalsValue)
  option.setAttribute("id",productIdValue)
  option.innerHTML = productNameValue
  return option
}
submitButton.addEventListener("click", () => {
  
  let productSelectBoxElement = selectBoxCreate();
  let optionElement = null;
  console.log(products)
  products.forEach((obj) => {
    const objId = obj._id;
    const objName = obj.name;
    const objCals = obj.kCaloryPerGm;
    optionElement = optionsCreate(objName,objCals,objId)
    productSelectBoxElement.appendChild(optionElement)
  });
  let inputGramsElement = inputGramsCreate()
  let caloriesElement= caloriesIntakeCreate()
  inputGramsElement.addEventListener("input",()=>{
    caloriesElement.innerHTML = inputGramsElement.value * productSelectBoxElement.value
  })
  productSelectBoxElement.addEventListener("change",()=>{
    caloriesElement.innerHTML = inputGramsElement.value * productSelectBoxElement.value
  })
  let productInfoElement = productInfoCreate(productSelectBoxElement,inputGramsElement,caloriesElement);
  let productElement = productCreate(productInfoElement);
  if (products.length === 0 && isEmpty === false) {
    productElement.remove();
    isEmpty = true;
  }
  productsContainer.appendChild(productElement);
});
