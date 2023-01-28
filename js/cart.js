window.addEventListener("load" , () => {
    calculateTotalPriceCart();
    UpdateCard()
    getTotalQty()
    showSideBar();
})


 
function showSideBar(){
  var sideBar = document.querySelector(".sideBar");
  var toggle  = document.querySelector(".menu_toggle");
  toggle.addEventListener("click" , function(){
    sideBar.classList.toggle("active_sideBar")
  })
}





    var storedData =  JSON.parse(sessionStorage.getItem("myList", "[]"));
    

    function getTotalQty(){
      var cartCount = document.querySelector(".cart_count")
      var qty = 0
      if ("totalQty" in sessionStorage) {
     qty = JSON.parse(sessionStorage.getItem("totalQty"))
      }
      else{ sessionStorage.setItem("totalQty", JSON.stringify(0))}
    cartCount.innerText = qty
    }




var totalItems = document.querySelector("#checkout_items");
var checkoutCard = document.querySelector(".checkoutCard_container")

function UpdateCard(){

totalItems.innerText = storedData.length;

storedData.map((item) => {
checkoutCard.innerHTML +=`
<div class="checkout_card" id="${item.id}">

<img class="checkout_product_image" src="${item.image}" alt="" />
<div class="order_content">
  <h4>${item.name}</h4>
  <p>x${item.quantity}</p>
  <p>
    <span>Amount Rs</span>
    <span>${item.price}</span>
  </p>
  </div>
`
})
}


function calculateTotalPriceCart(){
    var totalPrice = document.querySelector("#total_price")
    var totalCartPrice = storedData.reduce((total, item) => {

      return total + (item.price * item.quantity)
    }, 0)
    totalPrice.innerText = totalCartPrice
}
var user = storedData;
console.log(user)





var productList = JSON.parse(sessionStorage.getItem("myList", "[]"));

console.log(productList);
var grandTotal = storedData.reduce((total, item) => {
  return total+(item.price * item.quantity)
}, 0)





  $("#btn-place-order").on("click",  function () {
    console.log("xx")
  var orderItemArr = [];
  for(var i=0; i < productList.length; i++) {
      var prodObj = {
          "id": productList[i].id,
          "name": productList[i].name,
          "price": productList[i].price,
          "preview": productList[i].image,
      }

      orderItemArr.push(prodObj);
  }


  var dataObj = {
      amount: grandTotal,
      products: orderItemArr
  }
  console.log(dataObj)
  $.post('https://5d76bf96515d1a0014085cf9.mockapi.io/order', dataObj, function() {
      alert('Order Placed Successfully')
      sessionStorage.setItem('myList', []);

      location.assign('./confirmation.html');
  })
})



// function handleRequest() {
//   var xhttp = new XMLHttpRequest;

//   xhttp.onreadystatechange = function () {
//       if (xhttp.status == 201 && this.readyState == 4) {
//           console.log('post created');
//       }
//   }

//   // Data which will be sent to server
//   var obj = {
//       name: "Kashif Khan",
//       avatar: 'Post request',
//       id: 101,
//       storedData,
//   }

//   //making a post request
//   xhttp.open('POST', 'https://5d76bf96515d1a0014085cf9.mockapi.io/order', true);
//   xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
//   xhttp.send(JSON.stringify(obj));

// }
// var obj = {
//   name: "Kashif Khan",
//   id: 101,
//   avatar: 'Post request',
//   storedData,
// }
// console.log(JSON.stringify(obj))