/* global $ */
'use strict';
function getUserInput(){
  return $('#shopping-list-entry').val();
}

function getShoppingItem(event){
  return $(event.target)
    .parents('.shopping-item-controls')
    .siblings('.shopping-item');
}

function getHtml(input) {
  return `<li>
			<span class="shopping-item">${input}</span>
			<div class="shopping-item-controls">
				<button class="shopping-item-toggle">
					<span class="button-label">check</span>
				</button>
				<button class="shopping-item-delete">
					<span class="button-label">delete</span>
				</button>
			</div>
		</li>`;
}
function main() {
  $('#js-shopping-list-form').submit(function(event){ //add an item to list
    event.preventDefault();
    let newitem = getHtml(getUserInput());
    $('.shopping-list').append(newitem);
  });
	
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) { //toggle checkoff
    let item = getShoppingItem(event);
    item.toggleClass('shopping-item__checked');
    // item.hasClass('shopping-item__checked') === true ? item.removeClass('shopping-item__checked') : item.addClass('shopping-item__checked');
  });
	
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) { //delete item
    $(event.target).closest('li').remove();
  });
}


// function checkUncheck(){
// 	$('.shopping-list').on('submit', '.shopping-item-toggle', function(event){
// 		event.target.parents('.shopping-item').addClass('.shopping-item__checked');
// 	});
// }
$(main);

