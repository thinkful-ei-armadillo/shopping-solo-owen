/* eslint-disable no-console */
/* global $ */
'use strict';
// setting up a STORE database to separate page data from DOM

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function renderShoppingList() {
  // this function will render the shopping list in the DOM based on current STORE
  // render the STORE items in html by using a template function
  let shoppingListHTML = formatAsShoppingList(STORE);
  //insert html to parent shopping list element
  $('.js-shopping-list').html(shoppingListHTML);
}

function formatAsShoppingList(database) {
  return database.map((item, index) => shoppingItemHTML(item, index)).join('');
}

function shoppingItemHTML(item, itemIndex) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
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

function handleNewEntries() {
  // this function will handle inputs from users in the submit form at the top
  $('#js-shopping-list-form').on('submit', e => {
    e.preventDefault();
    
  }
  }
  // from #js-shopping-list-form
  // listen to form submission and grab text input
  // reformat raw text input to be object ready for STORE
  // push to STORE
  // send render function
  //log message to indicate function has completed successfully
  console.log('handleNewEntries ran');
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
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
    STORE.splice(itemIndex, 1); //remember that splice will cut all elements unless it is given a limit argument. here we splice 1 element, inclusive starting from the element that splice searched for
    // send render function
    renderShoppingList();
    console.log('handleDelete ran');
  });
}

function getitemIndexfromElement(item){
  //pass in shopping-item
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10); //this line coerces the index string selected from HTML
}

// this function calls all of the function stubs to run together on page load
function handleShoppingList() {
  renderShoppingList(); //Render shoppinglist based on STORE
  handleNewEntries(); //add shopping item text submission box/button
  handleChecked(); //toggling shopping item strikethrough button
  handleDelete(); //removing shopping items button
}

// calling the 'handle shopping list' function when the page loads
$(handleShoppingList);