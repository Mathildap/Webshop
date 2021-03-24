console.log("Det funkar");

// ARRAY NAME & PASSWORD
let users = [{uName: "Janne", pWord: "test"},
{uName: "Mathilda", pWord: "pettersson"},
{uName: "Robin", pWord: "olsson"}];

let cartList = [];
let totalCost = 0;

// LOCAL STORAGE
if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(users))
};

// GET / ADD ELEMENTS
const navBarBtnSignIn = document.getElementById("navBarBtnSignIn");
const main = document.getElementById("main");
const section = document.getElementById("section");
const btn = document.getElementById("btn");
const ulList = document.getElementById("ulList");
const products = document.getElementById("products");
const bagBtn = document.querySelector(".bag-btn");
const shoppingCartBtn = document.getElementById("shoppingCartBtn");
const shoppingCartToggle = document.querySelector(".shopping-cart-box");
const cartBox = document.querySelector(".cart-box");
const shoppingCartBox = document.getElementById("shoppingCartBox");
const shoppingCartProducts = document.getElementById("shoppingCartProducts");
const cartTotalAndBtn = document.getElementById("cartTotalAndBtn");

// HIDE SHOPPINGCART
shoppingCartToggle.style.display = "none";

// STARTPAGE
let startPage = `
<img src="produkt-pic.jpg" alt="product image" width="100%" id="imgOpacity">
<section id="section">
    <h2>Welcome</h2>
    <p>Please sign in to see more!</p>
</section>
<div id="placeForLogInBox"></div>`;

let placeForLogInBox = `
<div id="logInBox" class="logInBox">
<h3>User Login</h3>
<input type="text" placeholder="Username" id="uName"><br>
<input type="text" placeholder="Password" id="pWord"><br>
<p id="creAcc"><a href="#" id="creAccLink">Create account?</a></p>
<button id="logInBoxBtn">Sign in</button><div id="incLog"></div>
</div>`;

// PRINT MAIN
main.innerHTML = startPage + placeForLogInBox;

// PRODUCTS
const productContainer = document.createElement("div");
products.appendChild(productContainer);
productContainer.id = "productContainer";
productContainer.setAttribute("class", "products-container");

function printProducts() {
    fetch("products.json")
    .then(resp => resp.json())
    .then(productData => {

    for (product in productData) {
        const singleProduct = document.createElement("article");
        productContainer.appendChild(singleProduct);
        singleProduct.id = "singleProduct";
        singleProduct.setAttribute("class", "single-product");
        
        const imgContainer = document.createElement("div");
        singleProduct.appendChild(imgContainer);
        imgContainer.id = "imgContainer";
        imgContainer.setAttribute("class", "img-container");

        // PRINT PRODUCT
        imgContainer.insertAdjacentHTML("beforeend", `<img src="${productData[product].img}" alt="" class="product-img" id="${productData[product].id}">
        <button class="bag-btn" id="${productData[product].id}">Add to cart</button>`);
    
        singleProduct.insertAdjacentHTML("beforeend", `<h5>${productData[product].productname}</h5>
        <h6>Price: ${productData[product].price} sek</h6>`);
    };
});
};

printProducts();

// HIDE LOG IN BOX
document.getElementById("logInBox").style.display= "none";

// LOG IN BOX
const sectionOpacity = document.getElementById("sectionOpacity");
const logInBox = document.getElementById("logInBox");

// SIGN IN BUTTON - NAVBAR
navBarBtnSignIn.addEventListener("click", function() {
    console.log("Klick på Sign-in knapp");

    document.getElementById("logInBox").style.display= "block";
    document.getElementById("imgOpacity").setAttribute("style", "opacity: 0.2");
    document.getElementById("section").setAttribute("style","display: none");
});

// CREATE ACCOUNT
const creAccLink = document.getElementById("creAccLink");
creAccLink.addEventListener("click", function() {

    // CREATE ACCOUNT BOX
    logInBox.innerHTML = `<div id="addUserBox" class="addUserbox">
    <h3>Create account</h3>
    <input type="text" placeholder="Choose username" id="addUName"><br>
    <input type="text" placeholder="Choose password" id="addPword"><br>
    <button id="addUserBtn">Sign up</button>
    <button id="backBtn">Back</button></div>`

    // ADD USER TO ARRAY
    document.getElementById("addUserBtn").addEventListener("click", function() {
        console.log("Klick på Sign-up-knapp!");

        if (document.getElementById("addUName").value == "") {
            console.log("Empty input");
            console.log(users);
        } else {

        // LOCAL STORAGE / JSON
        if (localStorage.getItem(users) == null) {
            localStorage.setItem("users", JSON.stringify(users));
        };

        // GET
        let getUsers = JSON.parse(localStorage.getItem("users"));
        
        // CHANGE
        newUser = {uName: addUName.value, pWord: addPword.value}
        getUsers.push(newUser);
        console.log("New users arrow: ", getUsers);
        
        // SAVE
        localStorage.setItem("users", JSON.stringify(getUsers));
        location.reload();
        };
    });

    // BACK BUTTON
    document.getElementById("backBtn").addEventListener("click", function () {
        location.reload();
    });
});

// LOG IN FUNCTION
function getInfo() {
    const uName = document.getElementById("uName").value;
    const pWord = document.getElementById("pWord").value;

    let getUsers = JSON.parse(localStorage.getItem("users"));
    for (user in getUsers) {
        if(uName == getUsers[user].uName && pWord == getUsers[user].pWord) {
            console.log(uName + " is logged in!");
            localStorage.setItem("User", uName);
            loggedInPage();
            return;
        };
    };
    // LOG IN BOX FAIL
    console.log("Incorrect username or password.");
    incLog.innerHTML = "";
    incLog.insertAdjacentHTML("beforeend","<p id='incorrectMessage'>Incorrect username or password!</p>");
};

// LOGGED IN PAGE
function loggedInPage() {
    const uName = document.getElementById("uName").value;
    ulList.insertAdjacentHTML("beforeend", "<li id='loggedInUName'>" + localStorage.User + "</li>");

    // SIGN OUT BUTTON
    btn.innerHTML = "<button id='signOutBtn'>Sign Out</button>"
    document.getElementById("signOutBtn").addEventListener("click", function() {
        location.reload();
        localStorage.removeItem("User");
    });
    main.innerHTML = `
    <img src="produkt-pic.jpg" alt="product image" width="100%" id="imgOpacity">
    <section id="section">
    <h2>Welcome</h2>
    <p>Now you can shop!</p>
    <div id="arrow"><a href="#products"><i class="fasArrow fas fa-chevron-down"></i></a></div>
    </section>`;
};

// LOG IN EVENT
logInBoxBtn.addEventListener("click", function() {
    getInfo();
});

// CHECK IF LOGGED IN 
if (localStorage.getItem("User", uName)) {
    loggedInPage();
};

// QUANTITY IN CART
let cartItems = document.getElementById("cartItems");
cartItems.innerText = 0;
if (localStorage.getItem("Quantity in cart")) {
    const getQuantity = localStorage.getItem("Quantity in cart");
    cartItems.innerText = getQuantity;
};

// ADD TO CART
products.addEventListener("click", function(evt) {
    if (evt.target.className === "bag-btn") {
        console.log(evt.target.id);
        addToCart(evt.target.id);
        addTotalCost(evt.target.id);
    };
});

function addToCart(product) {
    cartItems.innerText++;
    localStorage.setItem("Quantity in cart", cartItems.innerText);
    cartList.push(product);
    localStorage.setItem("Cart", JSON.stringify(cartList));
};

// SHOPPING CART BUTTON
cartBox.addEventListener("click", function(evt) {
    if (shoppingCartToggle.style.display === "none") {
        shoppingCartToggle.style.display = "block";
        printShopCartItems();
        addTotal();
        clearShoppingCart();
    } else {
        shoppingCartToggle.style.display = "none";
    }
});

document.getElementById("closeShopCart").addEventListener("click", function() {
    toggleShoppingCart();
});

function toggleShoppingCart() {
    if (shoppingCartToggle.style.display === "none") {
    shoppingCartToggle.style.display = "block";
    } else {
    shoppingCartToggle.style.display = "none";
    };
};

// PRINT SHOPPING CART ITEMS
function printShopCartItems() {
    let productsFromLocal = JSON.parse(localStorage.getItem("Cart"));
    shoppingCartProducts.innerHTML = "";
    fetch("products.json")
    .then(resp => resp.json())
    .then(productData => {
        for (addedProduct in productsFromLocal) {
            for (product in productData) {
                if (productsFromLocal[addedProduct] == productData[product].id) {
                    // console.log("stämmer");
                    const shopCartPro = document.createElement("div");
                    shoppingCartProducts.appendChild(shopCartPro);
                    shopCartPro.id = [product];
                    shopCartPro.setAttribute("class", "shopping-cart-product");

                    shopCartPro.innerHTML = `<img src="${productData[product].img}" alt="" class="shop-cart-img"><p>${productData[product].productname}</p><p class="price">Price: ${productData[product].price} sek</p>`
                    const removeOneProduct = document.createElement("p");
                    removeOneProduct.id = productData[product].id;
                    removeOneProduct.setAttribute("class", "removeItem");
                    shopCartPro.appendChild(removeOneProduct);
                    removeOneProduct.textContent = "remove";
                };
            };
        };
    });
};

// TOTAL AMOUNT IN CART
function addTotal() {
    cartTotalAndBtn.innerHTML = "";
    const totalAmountCart = document.createElement("p");
    cartTotalAndBtn.appendChild(totalAmountCart);
    totalAmountCart.id = totalAmountCart;
    totalAmountCart.setAttribute("class", "total-amount-cart");
    totalAmountCart.innerHTML = "Your total: <span id='totalCostSpan'>0</span> sek";

    let getTotalCost = localStorage.getItem("Total cost");
    console.log(getTotalCost);
    const totalCostSpan = document.getElementById("totalCostSpan");
    if (localStorage.getItem("Total cost")) {
        totalCostSpan.innerText = getTotalCost;
    };
};

function addTotalCost(evt) {
    fetch("products.json")
    .then(resp => resp.json())
    .then(productData => {
        for (product in productData) {
            if (evt == productData[product].id) {
                console.log(productData[product].price);
                totalCost += productData[product].price;
                localStorage.setItem("Total cost", totalCost);
            };
        };
    });
};

// CLEAR SHOPPINGCART
function clearShoppingCart() {
    const clearCartBtn = document.createElement("button");
    cartTotalAndBtn.appendChild(clearCartBtn);
    clearCartBtn.id = "clearCartBtn";
    clearCartBtn.setAttribute("class", "clear-cart-btn");
    clearCartBtn.textContent = "Clear cart";

    clearCartBtn.addEventListener("click", function() {
        localStorage.removeItem("Cart");
        shoppingCartProducts.innerHTML = "";
        cartList.splice(0, cartList.length)
        localStorage.removeItem("Quantity in cart");
        cartItems.innerText = 0;
        console.log(cartList);
        localStorage.removeItem("Total cost");
        const totalCostSpan = document.getElementById("totalCostSpan");
        totalCostSpan.innerText = 0;
        totalCost = 0;
    });
};

shoppingCartProducts.addEventListener("click", function(evt) {
    removeProductFromCart(evt.target);
    removeFromCartIcon();
    reduceCost(evt.target.id);
});

// REMOVE PRODUCT FROM CART
function removeProductFromCart(product) {
    if (product.className == "removeItem") {
        product.parentNode.remove();
        let productsFromLocal = JSON.parse(localStorage.getItem("Cart"));
        console.log("from local: ", productsFromLocal);

        //------------------ HELP -------------------//
        productsFromLocal.splice(product.id, 1);
        localStorage.setItem("Cart", JSON.stringify(productsFromLocal));
        //-----------------------------------------//

        console.log(productsFromLocal);
    };
};

// REDUCE THE COST WHEN REMOVE ITEM
function reduceCost(evt) {
    fetch("products.json")
    .then(resp => resp.json())
    .then(productData => {
        for (product in productData) {
            if (evt == productData[product].id) {
                console.log("Ta bort pris: ", evt);
                let totalCostLS = JSON.parse(localStorage.getItem("Total cost"));
                totalCostLS -= productData[product].price;
                let totalCostSpan = document.getElementById("totalCostSpan");
                localStorage.setItem("Total cost", totalCostLS);
                totalCostSpan.innerText = totalCostLS;
            };
        };
    });
};

// REMOVE QUANTITY FROM CART ICON
function removeFromCartIcon() {
    const getQuantity = localStorage.getItem("Quantity in cart");
    cartItems.innerText--;
    localStorage.setItem("Quantity in cart", cartItems.innerText);
};