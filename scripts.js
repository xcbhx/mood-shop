import data from "./data.js"

const itemsContainer = document.querySelector("#items");

// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement("div");
	newDiv.className = "item"

    // create h2
    const name = document.createElement("H")
    // add a class name to the h2
    name.className = "name"
    name.innerText = data[i].name
    newDiv.appendChild(name)
    
	// create an image element
	const img = document.createElement("img");
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement("P")
	// give the paragraph text from the data
	desc.innerText = data[i].desc
    //class name
    desc.className = "desc"
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement("P")
	price.innerText = data[i].price
	newDiv.appendChild(price)
	// Make a button 
	const button = document.createElement("button")
    // add a class name to the button
    button.className = "add-to-cart"
	// add an  id name to the button
	button.dataset.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)

}


const cart = []

document.body.addEventListener("click", (e) => {
    if (e.target.matches(".add-to-cart")) {
      addItemToCart(e.target.dataset.id, e.target.dataset.price)
      displayCart() // display the cart!
    } else if ( e.target.matches(".button-add")) {
      // increase qty by 1
      const name = e.target.dataset.id
      addToCart(name)
      displayCart()
    } else if (e.target.matches(".button-sub")) {
      // decrease qty by 1
      const name = e.target.dataset.id // get the id
      removeFromCart(name) // call remove cart
      displayCart() // display the cart
    }
  })

document.body.addEventListener("change", (e) => {
  if (e.target.matches(".input-qty")) {
    const name = e.target.dataset.id // get the id
    const value = e.target.value // get the value from the input
    updateCart(name, value) // call updateCart with the id and val
    displayCart() // display the cart
  }
})

const updateCart = (id, val) => {
    // loop over item in cart
    for (let i = 0; i < cart.length; i += 1) {
      const item = cart[i] // get the item
      if (id === item.id) {
        // if the id matches set the qty
        item.qty = val
        // if the value is less than 1
        if (item.qty < 1) {
          // remove this item fom the cart
          cart.splice(i, 1)
        }
        return // exit this function
      }
    }
  }


const addItemToCart = (id, price) => {
    // loop over cart items
    for (let i = 0; i < cart.length; i += 1) {
      // if we find a matching item increase the quantity
      if (cart[i].id === id) {
        cart[i].qty += 1
        return // exit this function early
      }
    }
    // if no matching items were found add a new item
    cart.push({ id, price, qty: 1 })
}

const addToCart = (id) => {
  for (let i =0; i < cart.length; i += 1) {
    const item = cart[i] // get the item from the cart
    // does the name match the name of the id?
    if (id === item.id) {
      // if so
      item.qty += 1 // add 1 to qty
      return // exit this function early
    }
  }
}

const removeFromCart = (id) => {
  // loop over items in cart
  for (let i = 0; i < cart.length; i += 1) {
    // get an item 
    const item = cart[i]
    // does id match the item id?
    if ( id === item.id) {
      // if so, subtract 1 from item qty
      item.qty -= 1
      // check if the qty is 0
      if (item.qty === 0) {
        // if so remove this item from the cart
        cart.splice(i, 1)
      }
      return
    }
  }
}

const displayCart = () => {
    let cartStr = ""
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i]
        cartStr += `<li>
            <span>${item.id}</span>
            <input type="number" value="${item.qty}" class="input-qty" data-id="${item.id}">
            <span>${item.price}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
            <button class="button-add" data-id="${item.id}">+</button>
            <button class="button-sub" data-id="${item.id}">-</button>
        </li>`
    }
    // get the cart 
    const cartItems = document.querySelector("#cart-items")
    // set the inner html of the cart
    cartItems.innerHTML = cartStr
}

document.body.addEventListener("keydown", (e) => {
  if (e.target.matches(".input.qty")) {
    if (e.key === "Enter") {
      const name = e.target.dataset.id
      //use parseInt 
      const value = parseInt(e.target.value)
      updateCart(name, value)
      displayCart()
    }
  }
})