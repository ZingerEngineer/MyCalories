const productList = document.querySelector(".product-list");
const createButton = document.querySelector(".btn-1");
window.addEventListener("load", async () => {
  const res = await axios.get("/api/product");
  let productArray = res.data;
  productArray.forEach((obj) => {
    let objId = obj._id;
    let objName = obj.name;
    let objCals = obj.kCaloryPerGm;

    const editIcon = document.createElement("I");
    editIcon.classList.add("fa-solid", "fa-square-pen");
    const deleteIcon = document.createElement("I");
    deleteIcon.classList.add("fa-solid", "fa-square-xmark");
    const deleteButton = document.createElement("BUTTON");
    deleteButton.classList.add("delete-button");
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
            console.log("here")
            let id = product.id;
            product.remove();
            console.log(id)
            async () => {
             const res = await axios.delete("/api/product/",{
                params: {
                  ID: id
                }
              })
              console.log(res)
         console.log("here")};
          } else {
            swal("Delete canceled.");
          }
        });
      } catch (error) {}
    });
    deleteButton.appendChild(deleteIcon);
    const editButton = document.createElement("BUTTON");
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      window.location.assign("/pages/edit-product.html");
    });
    editButton.appendChild(editIcon);
    const productButtons = document.createElement("DIV");
    productButtons.classList.add("product-buttons");
    productButtons.appendChild(deleteButton);
    productButtons.appendChild(editButton);
    const productName = document.createElement("P");
    productName.classList.add("product-name");
    productName.innerText = objName;
    const productCals = document.createElement("P");
    productCals.classList.add("product-Kcalgm");
    productCals.innerText = objCals;
    const productInfo = document.createElement("DIV");
    productInfo.classList.add("product-info");
    productInfo.appendChild(productName);
    productInfo.appendChild(productCals);
    const product = document.createElement("DIV");
    product.appendChild(productInfo);
    product.appendChild(productButtons);
    product.classList.add("product");
    product.id = objId;
    productList.appendChild(product);
  });
});

createButton.addEventListener("click", () => {
  window.location.assign("/pages/new-product.html");
});
const editButton = document.querySelector(".edit-button");

const deleteButton = document.querySelector(".delete-button");
