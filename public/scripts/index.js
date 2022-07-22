async ()=>{
    try {
  
      await axios.get("/api/product/")
      console.log(products)
  
    } catch (error) {
      
    }  
  }
const createButton = document.querySelector(".btn-1")
const editButton = document.querySelector(".edit-button")
const deleteButton = document.querySelector(".delete-button")

createButton.addEventListener("click",()=>{
    window.location.replace("/pages/new-product.html")
})

editButton.addEventListener("click",()=>{
    window.location.replace("/pages/edit-product.html")
})

deleteButton.addEventListener("click",async ()=>{
  try {

    await axios.delete(`/api/product/${id}`)

  } catch (error) {
    
  }  
})