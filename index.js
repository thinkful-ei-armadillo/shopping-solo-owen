/* eslint-disable no-console */
/* global $ */
'use strict';

// issues:

// #1 accepts no text input, need to reject ''

// #2 adding item while in search filter renders entire list again, not sure what the default behavior should be
//    potentially add item to underlying STORE while still serving search term STORE.filter state in view
//    this means searchResults needs to be accessible to both add and submit items functions
//    searchResults needs to be a global variable, or maybe another key in STORE

// #3 current clear textfield implementation violates 'don't directly manipulate the DOM' rule
//    potentially, and may need to be wrapped into STORE as well?
//    add item STATE should update to clear text field
//    search item STATE should either retain text field input if there are no matches, or clear if there are?



// SHOPPING LIST APPLICATION

// setting up a STORE database to separate page data from DOM
// adding additional parent level keys, moving items into their own key
// to support multiple page states we want to render


const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];
// searchResults: {};
// hideCompleted: false;

function renderShoppingList(database) {
  // this function will render the shopping list in the DOM based on current STORE
  // render the STORE items in html by using a template function
  let shoppingListHTML = createListItemHTML(database);

  // reinitialize text field, ad hoc implementation and should be changed
  document.getElementById('js-shopping-list-entry').value = '';

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

function handleAddShoppingItem() {
  $('#js-shopping-list-form').submit('.js-add-to-shopping-list', function(e) { // listen to form submission
    e.preventDefault();
    // convert raw text input into a shopping item ready for STORE
    let shoppingItem = formatTextInput(getTextInput());
    // add newly converted item to STORE
    addToDatabase(shoppingItem);
    // render modified DOM
    renderShoppingList(STORE);
    console.log('added', shoppingItem);
  });
  console.log('Ready to add to shopping list');
}
//current issue: difference between submit from text field/button throws off creating object correctly
function handleSearchShoppingList() {
  $('#js-shopping-list-form').on('click', '.js-search-shopping-list', function(e) { // listen to form submission
    e.preventDefault();
    // retrieve raw textinput
    let searchTerm = getTextInput();
    // use filter to find matching names in STORE
    let searchResults = searchDatabase(searchTerm);
    // render only the filtered list
    renderShoppingList(searchResults);
    console.log('found', searchResults);
  });
  console.log('Ready to search shopping list');
}

function getTextInput() {
  return $('.js-shopping-list-entry').val(); // grab raw text input
}

function searchDatabase(searchTerm) { //recieve raw text str and filter STORE based on match to .name property
  return STORE.filter(item => item.name === searchTerm);
}

function formatTextInput(itemName) {
  return {'name': itemName, 'checked':false};
}

function addToDatabase(item) {
  STORE.push(item);
}

function handleChecked() {
  // this function will handle checking items on the shopping list, when the 'check' button is toggled
  // listen to 'CHECK' button click
  $('.shopping-list').on('click', '.shopping-item-toggle', function(e) { //toggle checkoff
    // console.log('index from 'checked' button trigger', item, 'from event', e.target);
    
    let itemIndex = getitemIndexfromElement(e.target);
    // console.log('accessing', STORE[item].checked, 'property in', STORE[item]);
    // use index to toggle associated checked property in STORE
    toggleProperty(itemIndex, 'checked');
    // render modified STORE
    renderShoppingList(STORE);
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
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    shoppingItem = $(event.currentTarget).parents('.shopping-item-controls').siblings('.shopping-item'); 
  
    // traverse to the shopping item class to get the index in STORE
    let itemIndex = getitemIndexfromElement(shoppingItem); //eventually combine line event listener and this line traversal
    // use index to remove associated checked property in STORE
    STORE.splice(itemIndex, 1); //remember that splice will cut all elements unless it is given a limit argument. here we splice 1 element, inclusive starting from the element that splice searched for
    // send render function
    renderShoppingList(STORE);    
  });
  console.log('Delete entry loaded...');
}

function getitemIndexfromElement(item){
  //pass in shopping-item
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10); //this line coerces the index string selected from HTML
}

// checkboxes receive 'change' and 'input' events




// this function calls all of the function stubs to run together on page load
function handleShoppingList() {
  renderShoppingList(STORE); //Render shoppingListHTML based on STORE
  handleAddShoppingItem(); //add shopping-item to STORE
  handleSearchShoppingList(); //search shopping-item in STORE
  handleChecked(); //toggling shopping item strikethrough button
  handleDelete(); //removing shopping items button
}

// calling the 'handle shopping list' function when the page loads
$(handleShoppingList);