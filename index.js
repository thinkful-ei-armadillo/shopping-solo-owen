/* eslint-disable no-console */
/* global $ */
'use strict';

// URGENT missing features:
// #1 hideChecked
// #2 inline edit


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

// #4 search currently only matches ===, ie. items: oranges search will find 'oranges' but not 'orange'

// #5 add display for no search match


// SHOPPING LIST APPLICATION

// setting up a STORE database to separate page data from DOM
// adding additional parent level keys, moving items into their own key
// to support multiple page states we want to render


const STORE = {
  items: [
    {name: 'apples', checked: false, editable: false},
    {name: 'oranges', checked: false, editable: false},
    {name: 'milk', checked: true, editable: false},
    {name: 'bread', checked: false, editable: false}
  ],
  searchResults: {},
  hideChecked: false,
};

function renderShoppingList(database, subset='items') {
  // this function will render the shopping list in the DOM based on current STORE
  // render the STORE items in html by using a template function
  // other features have option of storing their state specific data in STORE, then render
  // based on that feature driven state.
  let shoppingListHTML = createListItemHTML(database[subset]);

  // clear text field, ad hoc implementation and should be changed
  document.getElementById('js-shopping-list-entry').value = '';

  //insert html to parent shopping list element
  $('.js-shopping-list').html(shoppingListHTML);
  console.log('Rendering STORE to DOM...');
}

function createListItemHTML(database) {
  return database.map((item, index) => shoppingItemTemplate(item, index)).join('');
}

function shoppingItemTemplate(item, itemIndex) {
  console.log(item.name, item.editable);
  return (STORE.hideChecked && item.checked) ? '': `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}"> ${item.editable ? `<input type=text class="shopping-item-edit js-item-edit" placeholder=${item.name}></input>` : item.name} </span>
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

// cannot specify trigger id/class of .submit(), in contrast to .on()
function handleSearchShoppingList() {
  $('#js-shopping-list-form').on('click', '.js-search-shopping-list', function(e) { // listen to form submission
    e.preventDefault();
    // retrieve raw textinput
    let searchTerm = getTextInput('.js-shopping-list-entry');
    // use filter to find matching names in STORE
    STORE.searchResults = searchDatabase(searchTerm);
    // render only the filtered list
    renderShoppingList(STORE, 'searchResults');
    console.log('found', STORE.searchResults);
  });
  console.log('Ready to search shopping list');
}

function getTextInput(textBox) {
  return $(textBox).val(); // grab raw text input
}

function searchDatabase(searchTerm) { //recieve raw text str and filter STORE based on match to .name property
  return STORE.items.filter(item => item.name === searchTerm);
}

function formatTextInput(itemName) {
  return {'name': itemName, 'checked':false};
}

function addToDatabase(item) {
  STORE.items.push(item);
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
  return STORE.items[index][prop] = !STORE.items[index][prop];
}


function handleDelete() {
  // this function will handle deletion of items from shopping list when 'delete' button is clicked
  // listen to "DELETE" button click
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {  
    // traverse to the shopping item class to get the index in STORE
    let itemIndex = getitemIndexfromElement(event.target);
    // use index to remove associated checked property in STORE
    STORE.items.splice(itemIndex, 1); //remember that splice will cut all elements unless it is given a limit argument. here we splice 1 element, inclusive starting from the element that splice searched for
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
function handleHideChecked() {
  // trigger on change of checkbox
  $('#js-filter-checkboxes').on('change', '.js-hide-checked', () => {
    // toggle boolean in STATE to hidechecked on next render
    STORE.hideChecked = !STORE.hideChecked;
    // render modified STORE
    renderShoppingList(STORE);
  });
  console.log('Ready to hide checked...');
}

function handleEdit() {
  // trigger on click .js-shopping-item
  // toggle "editable" STORE.items property
  // render modified STORE
  $('.shopping-list').on('dblclick', '.js-shopping-item', function(e) {
    let itemIndex = getitemIndexfromElement(e.target);
    STORE.items[itemIndex].editable = !STORE.items[itemIndex].editable;
    // STORE.items[$('.js-shopping-item').val()].editable = !STORE[$('.js-shopping-item').val()].editable;
    renderShoppingList(STORE);
    console.log('item now editable');
    // after rendering item with text box instead of STORE.item.name text
    // place a listener on the text box submission
    // text box event listener is destroyed when there is no editable box from this function 
  });
  $('.shopping-list').on('submit', '.js-item-edit', function(e) {
    e.preventDefault();
    let itemIndex = getitemIndexfromElement(e.target);
    // set the STORE.item.name to the captured text input
    let newName = getTextInput('.js-item-edit');
    STORE.items[itemIndex].name = newName;
    renderShoppingList(STORE);
  });
  console.log('Ready to edit items');
}



// this function calls all of the function stubs to run together on page load
function handleShoppingList() {
  renderShoppingList(STORE); //Render shoppingListHTML based on STORE
  handleAddShoppingItem(); //add shopping-item to STORE
  handleSearchShoppingList(); //search shopping-item in STORE
  handleChecked(); //toggling shopping item strikethrough button
  handleDelete(); //removing shopping items button
  handleHideChecked();
  handleEdit();
}

// calling the 'handle shopping list' function when the page loads
$(handleShoppingList);