/* Checking if the page is loading, if it is, then it adds an event listener to the DOMContentLoaded
event, if it is not, then it calls the ready function. */
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


/**
 * When the page loads, add an event listener to each button that calls the function that is passed as
 * an argument.
 */
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

/**
 * It gets the cart-items element, then removes all of its children, then updates the cart total.
 */
function purchaseClicked() {
    alert('Danke das du die seite benutzt')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

/**
 * When the remove button is clicked, remove the parent of the parent of the button clicked.
 * @param event - The event object is a property of the Window object.
 */
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

/**
 * If the value of the input is not a number or is less than or equal to zero, then the value of the
 * input is set to 1. If the value of the input is greater than or equal to 11, then the value of the
 * input is set to 10.
 * @param event - The event object is a property of the Window object.
 */
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    if (input.value >= 11) {
        input.value = 10
    }
    updateCartTotal()
}

/**
 * When the add to cart button is clicked, get the title and price of the item, then add it to the cart
 * and update the total.
 * @param event - The event object is a JavaScript object that contains useful information about the
 * event that just happened.
 */
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}


/**
 * If the item is already in the cart, increase the quantity by 1. If the item is not in the cart, add
 * it to the cart.
 * @param title - The title of the item
 * @param price - The price of the item
 * @returns the value of the input field.
 */
function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var test = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            document.getElementsByClassName('cart-quantity-input')[i].value++
                if (document.getElementsByClassName('cart-quantity-input')[i].value >= 11) {
                    document.getElementsByClassName("cart-quantity-input")[i].value = 10
                    return
                }
            return
        }

    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Löschen</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

/**
 * It loops through all the cart rows, gets the price and quantity of each, and adds them to the total
 */
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + '€'
}

var divs = ["h", "a", "k", "k2", "m", "s"];
var visibleId = 0;

/**
 * If the visibleId is not equal to the id passed in, then set the visibleId to the id passed in.
 * @param id - The id of the element to show.
 */
function show(id) {
    if (visibleId !== id) {
        visibleId = id;
    }
    hide();
}

/**
 * If the id of the div is the same as the id of the div that is currently visible, then make it
 * visible, otherwise hide it.
 */
function hide() {
    var div, i, id;
    for (i = 0; i < divs.length; i++) {
        id = divs[i];
        div = document.getElementById(id);
        if (visibleId === id) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
}

/* Removing the active class from all the buttons, then adding the active class to the button that was
clicked. */
$("button").click(function() {
    $("button").removeClass("active");
    $(this).addClass("active");
});

/**
 * When the page loads, click the home button.
 */
function start() {
    document.getElementById("home").click();
}
