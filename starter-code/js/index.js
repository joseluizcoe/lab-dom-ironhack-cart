function deleteItem(event){
  let thisProduct = event.target.parentElement.parentNode;
  thisProduct.remove();
  getTotalPrice();
}

function getPriceByProduct(itemNode){

}

function updatePriceByProduct(productPrice, index){

}

function getTotalPrice() {
  let allProducts = document.querySelectorAll('.product');
  let fullPriceElement = document.querySelector('.full-price');
  
  let totalPrice = 0;
  // Para cada produto
  allProducts.forEach(function(product) {
    let totalElement = product.querySelector('.total>span');
    let quantityElement = product.querySelector('.quantity>span>input');
    let priceElement = product.querySelector('.price>span');
    
    let quantityValue = quantityElement.value;
    let priceValue = priceElement.innerText;

    let productTotalPrice = (quantityValue * priceValue);
    totalElement.innerText = parseFloat(productTotalPrice).toFixed(2);
    // Incrementa o valor total;
    totalPrice += productTotalPrice;
  });
  // Muda o texto do elemento fullPriceElement
  fullPriceElement.innerText = parseFloat(totalPrice).toFixed(2);;
}

function createQuantityInput(){

}

function createDeleteButton(){

}

function createQuantityNode(){

}

function createItemNode(dataType, itemData){
}

function createNewItemRow(itemName, itemUnitPrice){
  console.log('itemName',itemName);
  console.log('itemUnitPrice',itemUnitPrice);
  let productList = document.querySelector('.products');
  let product = productList.querySelector('.product').innerHTML;
  productList.appendChild(product);

}

function createNewItem(){
  let productNameElement = document.querySelector('.add-product input[name="title"]');
  let productPriceElement = document.querySelector('.add-product input[name="price"]');
  let itemName = productNameElement.value;
  let itemUnitPrice = productPriceElement.value;
  createNewItemRow(itemName, itemUnitPrice);
}

window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
};
