

function renderCart(elm) {
    // Get cart cookie
    var cartParse = JSON.parse(getCookie('cart'));
    console.log(cartParse);

    // Create table header
    let headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th>Action</th>
    `;

    // Create table body
    let tbody = document.createElement('tbody');
    let cartTotal = 0;
    for (let item in cartParse) {
        let itemPrice = cartParse[item].price;
        let itemQty = cartParse[item].qty;
        let itemSubtotal = itemPrice * itemQty;
        cartTotal += itemSubtotal;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td class="product">${item}</td>
            <td class="price">$${itemPrice.toFixed(2)}</td>
            <td class="quantity">
                <input type="number" class="form-control" value="${itemQty}" onchange="updateCart('${item}', this.value)">
            </td>
            <td class="subtotal">$${itemSubtotal.toFixed(2)}</td>
            <td class="action">
                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item}', this.closest('tr'))">
                    <i class="fa fa-trash-o"></i> Remove
                </button>
            </td>
        `;

        tbody.appendChild(row);
    }

    // Create table footer
    let footerRow = document.createElement('tr');
    footerRow.innerHTML = `
        <td colspan="3" class="text-right">Total:</td>
        <td class="subtotal">$${cartTotal.toFixed(2)}</td>
        <td></td>
    `;

    // Create checkout button row
    let checkoutRow = document.createElement('tr');
    checkoutRow.innerHTML = `
        <td colspan="5" class="text-right">
            <button class="btn btn-primary" onclick="checkout()">Checkout</button>
        </td>
    `;

    // Create table element and add header, body, footer, and checkout button
    let cartTable = document.createElement('table');
    cartTable.classList.add('cart-table');
    cartTable.appendChild(headerRow);
    cartTable.appendChild(tbody);
    cartTable.appendChild(footerRow);
    cartTable.appendChild(checkoutRow);

    // Add table element to the specified element in the DOM
    elm.innerHTML = '';
    elm.appendChild(cartTable);
}

function checkout() {
    // Get cart cookie
    var cartParse = JSON.parse(getCookie('cart'));

    // Send cart data to server
    fetch('/checkout', {
        method: 'POST',
        body: JSON.stringify(cartParse),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display confirmation message to user
        alert(`Thank you for your order! Your order number is ${data.orderNumber}.`);
        // Clear the cart cookie
        setCookie('cart', '{}', 7);
        // Re-render the cart table
        renderCart(document.getElementById('cart-table'));
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your order. Please try again later.');
    });
}

function removeFromCart(item, row) {
    // Get cart cookie
    var cartParse = JSON.parse(getCookie('cart'));

    // Remove item from cart
    delete cartParse[item];

    // Update cart cookie
    setCookie('cart', JSON.stringify(cartParse), 7);

    // Remove row from table
    row.remove();

    // Re-render cart table
    renderCart(document.getElementById('cart-table'));
}

function getCookie(name) {
    // Get cookie by name
    const nameEQ = `${name}=`;
    // Split cookies into array
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        // Remove leading whitespace
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
    }

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = `; expires=${date.toGMTString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
}

function init() {
    var cart = document.getElementById("cart-table")
    renderCart(cart);  
    removeFromCart();
    checkout();
}

$(document).ready(function() {
    init();
});

