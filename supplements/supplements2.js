let products = [
    { id: 401, title: "Pre-workout", price: "$50", p: "High Energy & Focus", imageUrl: "pre.jpg" },
    { id: 402, title: "Whey Protein", price: "$80", p: "Muscle Recovery", imageUrl: "whey.jpg" },
    { id: 403, title: "Creatine", price: "$30", p: "Power & Strength", imageUrl: "creatine.jpg" },
    { id: 404, title: "BCAA", price: "$40", p: "Amino Acids for recovery", imageUrl: "bcaa.jpg" },
    { id: 405, title: "Multivitamins", price: "$25", p: "Daily health support", imageUrl: "vitamins.jpg" },
    { id: 406, title: "Omega 3", price: "$20", p: "Heart and brain health", imageUrl: "omega3.jpg" },
    { id: 407, title: "Fat Burner", price: "$45", p: "Weight management support", imageUrl: "burner.jpg" },
    { id: 408, title: "Mass Gainer", price: "$90", p: "High calorie for bulking", imageUrl: "gainer.jpg" }
];

let suppGrid = document.querySelector("#supp-grid");

function drawItems() {
    let productUI = products.map((item) => {
        let itemData = JSON.stringify(item).replace(/'/g, "\\'"); 
        
        return `
            <div class="supp-card">
                <img src="images/${item.imageUrl.split('/').pop()}" alt="${item.title}">
                <div class="supp-content">
                    <h3>${item.title}</h3>
                    <p class="supp-price">${item.price}</p>
                    <p style="font-size: 0.9rem; color: #666;">${item.p}</p>
                    <div class="supp-controls">
                        <button class="add-btn" onclick='addToCart(${itemData})'>ADD TO CART</button>
                    </div>
                </div>
            </div>`;
    }).join("");
    
    if(suppGrid) suppGrid.innerHTML = productUI;
}

function addToCart(item) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let imageName = item.imageUrl.split('/').pop();

    let itemForCart = {
        ...item,
        imageUrl: "../../../supplements/images/" + imageName 
    };

    cartItems.push(itemForCart);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    showToast(`${item.title} Added!`);
}

function showToast(message) {
    let toast = document.getElementById("toast");
    let toastMsg = document.getElementById("toast-message");
    if(toast) {
        toastMsg.innerHTML = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }
}

drawItems();