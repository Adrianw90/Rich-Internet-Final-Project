function featureProducts(elm){
    elm.innerHTML = ""
    for (let p in products){
        let pd = '<div class="card m-5">' +
                    '<img class="image" src="' + products[p].imgs[0] + '" class="card-img-top" alt="' + products[p].title + '">' +
                    '<div class="card-body">' +
                    '<h6 class="prod-title">' + products[p].title + '</h6><br>' +
                    '<label class="form-label">Available Colors:</label><br>' +
                    // '<input type="radio" background-color="' + products[p].colors + '" name="color" value="' + products[p].colors[0] + '" checked>' +
                    '<p class="card-text">$' + products[p].price + '</p>' +
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal' + p + '">Details</button>' +
                    '<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>' +
                    '</div>' +
                '</div>' +
                '<div class="modal fade" id="modal' + p + '" tabindex="-1" aria-labelledby="modal' + p + 'label" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h1 class="modal-title fs-5" id="modal' + p + 'label">' + products[p].title + '</h1>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                    '</div>' +
                    '<img class="image" src="' + products[p].imgs[0] + '" class="card-img-top" alt="' + products[p].title + '">' +
                    '<img class="image" src="' + products[p].imgs[2] + '" class="card-img-top" alt="' + products[p].title + '">' +
                    '<img class="image" src="' + products[p].imgs[3] + '" class="card-img-top" alt="' + products[p].title + '">' +
                    '<img class="image" src="' + products[p].imgs[4] + '" class="card-img-top" alt="' + products[p].title + '">' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                        '<button class="btn-cart" type="button" class="btn btn-primary">Add to Cart</button>' +
                    '</div>' +
                    '</div>' +
                '</div>' +
                '</div>'
        elm.innerHTML += pd;
    }
}

function justArrived(el){
    el.innterHTML = ""
    for (let n in new_products){
        let np = '<div class="card m-5">' +
                    '<img class="new-image" src=" ' + new_products[n].imgs[0] + '" class="card-img-top" alt="' + new_products[n].title + '">' +
                    '<div class="card-body">' +
                    '<h6 class="prod-title">' + new_products[n].title + '</h6><br>' +
                    '<label class="form-label">Available Colors:</label>' +
                    '<p class="card-text">$' + new_products[n].price + '</p>' +
                    '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNew' + n + '">Details</button>' +
                    '<p class="card-text"><small class="text-body-secondary">Last updated 2 mins ago</small></p>' +
                    '</div>' +
                '</div>' +
                '<div class="modal fade" id="modalNew' + n + '" tabindex="-1" aria-labelledby="modalNew' + n + 'label" aria-hidden="true">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h1 class="modal-title fs-5" id="modalNew' + n + 'label">' + new_products[n].title + '</h1>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                    '</div>' +
                    '<img class="image" src="' + new_products[n].imgs[0] + '" class="card-img-top" alt="' + new_products[n].title + '">' +
                    '<img class="image" src="' + new_products[n].imgs[2] + '" class="card-img-top" alt="' + new_products[n].title + '">' +
                    '<img class="image" src="' + new_products[n].imgs[3] + '" class="card-img-top" alt="' + new_products[n].title + '">' +
                    '<img class="image" src="' + new_products[n].imgs[4] + '" class="card-img-top" alt="' + new_products[n].title + '">' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                        '<button class="btn-cart" type="button" class="btn btn-primary">Add to Cart</button>' +
                    '</div>' +
                    '</div>' +
                '</div>' +
                '</div>'
        el.innerHTML += np;
    }
}

// Function that collects the count of an item when a user clicks on the add to cart button
// stores count of products added to cart in an dictionary object with product name as key and count as value
function storeCount(){
    let cookie = document.cookie
    let cart = {}
    if (cookie.length > 0){
        cookie = cookie.split(";")
        for (let c in cookie){
            let cName = cookie[c].split("=")[0].trim()
            let cValue = cookie[c].split("=")[1].trim()
            cart[cName] = cValue

        }
    }
    let btn = document.getElementsByClassName("btn-cart")
    for (let b in btn){
        btn[b].onclick = ()=>{
            let pName = btn[b].parentElement.parentElement.getElementsByClassName("modal-title")[0].innerHTML
            if (cart[pName] == undefined){
                cart[pName] = 1
            }else{
                cart[pName] = parseInt(cart[pName]) + 1
            }
            document.cookie = pName + "=" + cart[pName]
        }
    }
    console.log(cart)
    for (let c in cart){
        pName = c
        pQty = cart[c]
        let itemPrice = 0
        let itemSubtotal = 0
        for (let p in products){
            if (products[p].title == pName){
                itemPrice = products[p].price
                products[p].qty = pQty
                itemSubtotal = itemPrice * products[p].qty
            } else {
                products[p].qty = 0
            }
        }
        for (let n in new_products){
            if (new_products[n].title == pName){
                itemPrice = new_products[n].price
                new_products[n].qty = pQty
                itemSubtotal = itemPrice * new_products[n].qty
            } else {
                new_products[n].qty = 0
            }
        }
        cart[pName] = {
            qty: pQty,
            price: itemPrice,
            subtotal: itemSubtotal
        }
        document.cookie = "cart=" + JSON.stringify(cart) // set the cart cookie with the updated cart object        
    }
}


// Function that initializes the page
function init(){
    var pCat = document.getElementById("featProducts")
    featureProducts(pCat)
    var nProd = document.getElementById("newProducts")
    justArrived(nProd)
    storeCount()
}

// Function that runs when the page is loaded
$(document).ready(()=>{
    init()
})