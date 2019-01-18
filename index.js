/* global $ */
'use strict';

// setting our STORE so our data can be independent

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];

function renderTheList() {
  // this function will render the shopping list in the DOM
  
  // it will render it by reading the current state of the STORE
  
  // by reading the STORE, it will construst <ul> class using the html <li> template function
  
  // it will then send the constructed template to the DOM using the html() method

  console.log('renderTheList ran');
}

function handleNewEntries() {
  // this function will handle inputs from users in the submit form at the top
  // from #js-shopping-list-form
  // listen to form submission and grab text input
  // reformat raw text input to be object ready for STORE
  // push to STORE
  // send render function
  console.log('handleNewEntries ran');
}

function handleChecked() {
  // this function will handle checking items on the shopping list, when the 'check' button is toggled
  //listen to 'CHECK' button click
  // traverse to the shopping item class to get the index in STORE
  // use index to toggle associated checked property in STORE
  // send render function
  console.log('handleChecked ran');
}

function handleDelete() {
  // this function will handle deletion of items from shopping list when 'delete' button is clicked
  // listen to "DELETE" button click
  let shoppingItem = '';
  $('.shopping-list').on('click', '.shopping-item-delete', (event) => {
    shoppingItem = $(event.currentTarget).parents('.shopping-item-controls').siblings('.shopping-item'); 
  };
  // traverse to the shopping item class to get the index in STORE
  let itemIndex = getitemIndexfromSTORE();
  STORE[indexofshoppingitem].remove();
  // use index to remove associated checked property in STORE

  // send render function
  renderTheList();
  console.log('handleDelete ran');
}

function getitemIndexfromSTORE(

// this function calls all of the function stubs to run together on page load
function handleShoppingList() {
  renderTheList();
  handleNewEntries();
  handleChecked();
  handleDelete();
}
// calling the 'handle shopping list' function when the page loads
$(handleShoppingList);