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
  let shoppingListHTML = createListItemHTML(STORE);
  //insert html to parent shopping list element
  $('.js-shopping-list').html(shoppingListHTML);
  console.log('Rendering STORE to DOM...');
}

function createListItemHTML(database) {
  return database.map((item, index) => shoppingItemTemplate(item, index)).join('');
}

function shoppingItemTemplate(item, itemIndex) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
  <span class="shopping-item js-shopping-item ${item.checked ? 'class = shopping-item__checked' : ''}">${item.name}</span>
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
  $('#js-shopping-list-form').on('submit', function(e) { // listen to form submission
    e.preventDefault();
    let textInput = $('.js-shopping-list-entry').val(); // grab raw text input

    // reformat raw text input to object for STORE
    let shoppingItem = createItemObject(textInput);
    // add successfully reformatted raw text input to STORE
    addToDatabase(shoppingItem);

    // render modified STORE
    renderShoppingList();
  });
  console.log('Ready to add entries to STORE...'); //status message RTG
}

function createItemObject(itemName, checked=false) {
  return {name: itemName, checked};
}

function addToDatabase(itemName) {
  STORE.push(itemName);
}

function handleChecked() {
  // this function will handle checking items on the shopping list, when the 'check' button is toggled
  
  // listen to 'CHECK' button click
  $('.shopping-list').on('click', '.shopping-item-toggle', function(e) { //toggle checkoff
    // fetch STORE index associated with shopping-item check button event trigger
    let itemIndex = getitemIndexfromElement(e.target);
   
    // use index to toggle associated checked property in STORE
    toggleProperty(itemIndex, 'checked');

    // render modified STORE
    renderShoppingList();
  });  
  console.log('Toggle strikethrough loaded...'); //status message RTG
}

function toggleProperty (index, prop) {
  return STORE[index][prop] = !STORE[index][prop];
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
    
  });
  console.log('Delete entry loaded...');
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