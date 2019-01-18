/* eslint-disable no-console */
/* global $ */
'use strict';

// setting our STORE so our data can be independent

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
  return `<li class="js-item-index-element" data-item-index="${itemIndex}">
  <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-toggle js-item-toggle">
        <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete js-item-delete">
        <span class="button-label">delete</span>
    </button>
  </div>
</li>`;
}

function generateShoppingItemsString(shoppingList) {
  // this will read the store and generate a string for the renderTheList function to use
  console.log('Generating shopping list element');
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  // generateItemElement(item, join);

  return items.join('');
}

function renderTheList() {

  // this function will render the shopping list in the DOM
  console.log('renderTheList ran');
  // it will render it by reading the current state of the generateShoppingItemsString
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  // it will then send the constructed template to the DOM using the html() method
  $('.js-shopping-list').html(shoppingListItemsString);
  
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewEntries() {
  // this function will handle inputs from users in the submit form at the top

  // from #js-shopping-list-form
  // listen to form submission and grab text input
  // reformat raw text input to be object ready for STORE
  // push to STORE
  // send render function
  //log message to indicate function has completed successfully
  console.log('handleNewEntries ran');
}

function getitemIndexfromElement(item){
  //pass in item 
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleChecked() {
  // this function will handle checking items on the shopping list, when the 'check' button is toggled

  // listen to 'CHECK' button click
  // traverse to the shopping item class to get the index in STORE
  // use index to toggle associated checked property in STORE
  // send render function
  //log message to indicate function has completed successfully
  console.log('handleChecked ran');
}

function handleDelete() {
  // this function will handle deletion of items from shopping list when 'delete' button is clicked

  // listen to "DELETE" button click
  let shoppingItem = '';
  $('.shopping-list').on('click', '.shopping-item-delete', (event) => {
    shoppingItem = $(event.currentTarget).parents('.shopping-item-controls').siblings('.shopping-item'); 
  
    // traverse to the shopping item class to get the index in STORE
    let itemIndex = getitemIndexfromElement(shoppingItem); //eventually combine line event listener and this line traversal
    // use index to remove associated checked property in STORE
    STORE.splice(itemIndex, 1);
    // send render function
    renderTheList();
    console.log('handleDelete ran');
  });
}



// this function calls all of the function stubs to run together on page load
function handleShoppingList() {
  renderTheList();
  handleNewEntries();
  handleChecked();
  handleDelete();
}

// calling the 'handle shopping list' function when the page loads
$(handleShoppingList);