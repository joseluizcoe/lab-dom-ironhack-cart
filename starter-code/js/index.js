function deleteItem(event){
  let thisProduct = event.target.parentElement.parentNode;
  thisProduct.remove();
  uptateTotalPrice();
}

function updateDeleteButtonBehavior() {
  let deleteButtons = document.getElementsByClassName('btn-delete');
  for(let i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
}

function getPriceByProduct(itemNode){
  return itemNode.querySelector('.price>span') || 0.00;
}


function uptateTotalPrice() {
  let allProducts = document.querySelectorAll('.product');
  let fullPriceElement = document.querySelector('.full-price');
  
  let totalPrice = 0;
  // Para cada produto
  allProducts.forEach(function(product, index) {
    let totalElement = product.querySelector('.total>span');
    let quantityElement = product.querySelector('.quantity>span>input') || 0;
    let priceElement = getPriceByProduct(product);
    
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
  /*  <div class="quantity">
        <span>
          <label>QTY</label>
          <input name="quant" />
        </span>
      </div>
  */

  let span = document.createElement('span');
  let label = document.createElement('label');
  let input = document.createElement('input');

  input.setAttribute('name', 'quant')
  input.setAttribute('type', 'number');

  label.innerText = "QTY";

  span.appendChild(label);
  span.appendChild(input);

  return span;
}

function createDeleteButton(){
  /*
  <div class="product-actions">
    <button class="btn btn-delete">Delete</button>
  </div>
  */

  let button = document.createElement('button');
  let div = document.createElement('div');

  button.setAttribute('class', 'btn btn-delete');
  button.innerText = 'Delete';
  
  div.setAttribute('class', 'product-actions')
  div.appendChild(button);
  
  return div;
}

function createQuantityNode(){

  let quantityColumn = document.createElement('div');
  let input = createQuantityInput();

  quantityColumn.setAttribute('class', 'quantity');
  quantityColumn.appendChild(input);

  return quantityColumn;
}


function createTitleNode(itemName) {
    // title
    let titleDiv = document.createElement('div');
    let titleSpan = document.createElement('span');

    titleSpan.innerText = itemName;

    titleDiv.appendChild(titleSpan);
    titleDiv.setAttribute('class', 'title');

    return titleDiv;
}

function createPriceNode(itemUnitPrice) {
  /* 
    <div class="price">
      $<span>${itemUnitPrice}</span>
    </div>
  */
  let priceSpan = document.createElement('span');
  priceSpan.innerText = itemUnitPrice;
  
  let priceDiv = document.createElement('div');

  priceDiv.setAttribute('class', 'price')
  priceDiv.innerHTML='$';
  priceDiv.appendChild(priceSpan);
  
  return priceDiv;
}

function createTotalNode() {
  /* <div class="total">$<span>0.00</span></div> */
  let totalDiv = document.createElement('div');
  totalDiv.setAttribute('class', 'total');
  totalDiv.innerHTML = `$<span>0.00</span>`;
 
  return totalDiv;

}

function createNewItemRow(itemName, itemUnitPrice){
  let newItemRow = document.createElement('div');
  let titleDiv = createTitleNode(itemName);
  let priceDiv = createPriceNode(itemUnitPrice);
  let quantityDiv =  createQuantityNode();
  let totalDiv = createTotalNode();
  let deleteDiv = createDeleteButton();
  
  newItemRow.setAttribute('class', 'product');
  newItemRow.appendChild(titleDiv);
  newItemRow.appendChild(priceDiv);
  newItemRow.appendChild(quantityDiv);
  newItemRow.appendChild(totalDiv);
  newItemRow.appendChild(deleteDiv);

  return newItemRow;
}

function createNewItem(){
  let productList = document.querySelector('.products');
  let addProduct = document.querySelector('.add-product');
  let newItemName = addProduct.querySelector('input[name="title"]').value || 'Novo Produto';
  let newItemPrice = addProduct.querySelector('input[name="price"]').value || 1.00;

  let newRow = createNewItemRow(newItemName, newItemPrice);

  productList.appendChild(newRow);
  updateDeleteButtonBehavior();
}

window.onload = function(){
  let calculatePriceButton = document.getElementById('calc-prices-button');
  let createItemButton = document.getElementById('new-item-create');

  calculatePriceButton.onclick = uptateTotalPrice;
  createItemButton.onclick = createNewItem;

  updateDeleteButtonBehavior();
  uptateTotalPrice();
};
