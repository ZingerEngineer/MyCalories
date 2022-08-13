const submitButton = document.querySelector(".submit-input")
const selectBox = document.querySelector("#products-box")
let products = []
const productOptionCreation = (objName, objId)=>{
  let productOption = document.createElement("OPTION")
  productOption.setAttribute("id",objId)
  productOption.innerText = objName
  productSelectBox.appendChild(productOption)
}
window.addEventListener("load", async function renderer() {
  const res = await axios.get("/api/product");
  products = res.data;
  products.forEach((obj) => {
    const objId = obj._id;
    const objName = obj.name;
    productOptionCreation(objName,objId)
  });
});


const productNameCreate = (name, productId) => {
  const productName = document.createElement("P");
  productName.classList.add("product-name");
  productName.setAttribute("id", `${productId}-product-name`);
  productName.innerText = name;
  return productName;
};
const productCalsCreate = (cals, productId) => {
  const productCals = document.createElement("P");
  productCals.classList.add("product-Kcalgm");
  productCals.setAttribute("id", `${productId}-product-cals`);
  productCals.innerText = cals;
  return productCals;
};
const productInfoCreate = (productName, productCals, productId) => {
  const productInfo = document.createElement("DIV");
  productInfo.classList.add("product-info");
  productInfo.setAttribute("id", `${productId}-product-info`);
  productInfo.appendChild(productName);
  productInfo.appendChild(productCals);
  return productInfo;
};

const productCreate = (objId, productInfo) => {
  const product = document.createElement("DIV");
  product.appendChild(productInfo);
  product.classList.add("product");
  product.id = objId;
  return product;
};



submitButton.addEventListener("click", ()=>{
productNameCreate()
productCalsCreate()
productInfoCreate()
productCreate()
})