


var id = 1;
var dynamicProduct = document.querySelector(".product_container");
var imageBox = document.querySelector(".img_full");
var productDescription = document.querySelector(".product_desc")


window.addEventListener("load", () => {
  ShowProduct();
  getTotalQty();
  showSideBar();
});



function showSideBar(){
  var sideBar = document.querySelector(".sideBar");
  var toggle  = document.querySelector(".menu_toggle");
  toggle.addEventListener("click" , function(){
    sideBar.classList.toggle("active_sideBar")
  })
}
function getItem(key) {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
}

function ShowProduct() {
  var productUrl = `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${getItem(
    "id"
  )}`;
  fetch(productUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      imageBox.innerHTML = `
      <img class ="main_img" src=${data.preview} alt="">
    `
    productDescription.innerHTML = 
    `
      <h2 class="title">${data.name}</h2>
      <h3 class="subtitle">${data.brand}</h3>
      <h3 class="price">Price Rs : <strong>${data.price}</strong></h3>
      <h4 class="subtitle">Description</h4>
      <p class="description">
       ${data.description}
      </p>
      <h4 class="subtitle">Product Preview</h4>
      <div class="product_preview">
         <img  class="small_img active" onclick="changeActive()" src="${data.photos[0]}" alt="">
         <img  class="small_img" onclick="changeActive()" src="${data.photos[1]}" alt="">
         <img class="small_img" onclick="changeActive()" src="${data.photos[2]}" alt="">
         <img class="small_img" onclick="changeActive()" src="${data.photos[3]}" alt="">
         <img class="small_img" onclick="changeActive()" src="${data.photos[4]}" alt="">
      </div>
    `
    document.querySelector(".add_to_cart").addEventListener("click" , function(e){
      getData(data);
      setQty()
      getTotalQty()
  
    })
      });
}

function changeActive(){
  var smallImg = document.querySelectorAll(".small_img");

  smallImg.forEach((small) =>
    small.addEventListener("click", function (e) {
      var fullImg = document.querySelector(".main_img");
      var newImg = document.querySelectorAll(".small_img");
      fullImg.src = e.target.src;
      for (var i = 0; i < newImg.length; i++) {
        newImg[i].classList.remove("active");
      }
      e.target.classList.add("active");
    })
  )
  
}

function setQty() {
  if ("myList" in sessionStorage) {
    let length = JSON.parse(sessionStorage.getItem("myList", "[]"));
    var totalQuantity = length.reduce((prev, current) => {
      return prev + current.quantity
  }, 0)
  sessionStorage.setItem("totalQty", JSON.stringify(totalQuantity))
  }

}

function getTotalQty(){
  var cartCount = document.querySelector(".cart_count")
  var qty = 0
  if ("totalQty" in sessionStorage) {
 qty = JSON.parse(sessionStorage.getItem("totalQty"))
  }
  else{ sessionStorage.setItem("totalQty", JSON.stringify(0))}
cartCount.innerText = qty
}




  function getData(obj){
    var orderData = {
      image : obj.preview,
      name: obj.name,
      price : obj.price,
      quantity : 1,
      id : obj.id

    }
    addNewItem(orderData)
    
  }
  function addNewItem (item) {
    if ("myList" in sessionStorage) {
      let myList = JSON.parse(sessionStorage.getItem("myList", "[]"));
      var newItem = myList.find(value => value.id === item.id)
      if(newItem){
        newItem.quantity++
      }else{
      myList.push(item);
      console.log("nn")
      }
      sessionStorage.setItem("myList", JSON.stringify(myList));
      console.log(JSON.parse(sessionStorage.getItem("myList", "[]")))
  } else {
   let myList = item
    console.log("nn")
    sessionStorage.setItem("myList", JSON.stringify([myList]));
  }
  
  }
    