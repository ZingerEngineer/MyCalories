const productSearch = document.querySelector(".product-search");
const productList = document.querySelector(".product-list");
let products = []
let isOpen = false;

document.addEventListener("click", (event) => {
  if (event.target === productSearch && isOpen === false) {
    isOpen = true;
    productList.setAttribute("class", "product-list");
    productSearch.setAttribute("class", "product-search open");
  } else if (event.target === productSearch && isOpen === true) {
    productList.setAttribute("class", "product-list");
    productSearch.setAttribute("class", "product-search open");
  } else {
    isOpen = false;
    productList.setAttribute("class", "product-list hidden");
    productSearch.setAttribute("class", "product-search");
  }
});

productSearch.addEventListener("input", ()=>{
    
})