const equipments = [
    { id: 601, name: "Resistance Bands", price: 10, img: "Resistance Bands.jfif" },
    { id: 602, name: "Yoga Mat", price: 25, img: "yoga mat.jfif" },
    { id: 603, name: "Dumbbells set", price: 50, img: "dumbbell set.jfif" },
    { id: 604, name: "Jump Rope", price: 10, img: "jump rope.jfif" },
    { id: 605, name: "Fitball", price: 15, img: "fitball.jfif" },
    { id: 606, name: "Push up bars", price: 40, img: "push up bars.jfif" }
];


function displayEquipments() {
    const grid = document.getElementById('equip-grid');
    if (!grid) return;

    grid.innerHTML = equipments.map(item => {
        let itemData = JSON.stringify({
            id: item.id,
            title: item.name,
            price: `$${item.price}`,
            imageUrl: item.img
        }).replace(/'/g, "\\'");

        return `
            <div class="equip-card">
                
                <img src="../Gallery/${item.img}" alt="${item.name}" onerror="this.onerror=null;this.src='../images/gym1.png'">
                <div class="eqip-content">
                    <h3>${item.name}</h3>
                    <p class="eqip-price">$${item.price}</p>
                    <div class="eqip-controls">
                        <div class="quantity-selector">
                            <button class="qty-btn" onclick="changeQty(this, -1)">-</button>
                            <span class="qty-number">1</span>
                            <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
                        </div>
                        <button class="add-btn" onclick='prepareAddToCart(${itemData}, this)'>Add</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}


function prepareAddToCart(item, btn) {
    const qtySpan = btn.parentElement.querySelector('.qty-number');
    const quantity = parseInt(qtySpan.innerText) || 1;
    addToCart(item, quantity);
}


function addToCart(item, quantity) {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let finalPath = "../../../Gallery/" + item.imageUrl;

        const itemForCart = {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: quantity,
            description: "", 
            imageUrl: finalPath
        };

        let existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push(itemForCart);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(`${quantity} ${item.title} Added! ✅`);

    } catch (error) {
        console.error("Cart Error:", error);
    }
}


function changeQty(btn, change) {
    const qtySpan = btn.parentElement.querySelector('.qty-number');
    let currentQty = parseInt(qtySpan.innerText);
    currentQty += change;
    if (currentQty < 1) currentQty = 1;
    qtySpan.innerText = currentQty;
}

function showToast(message) {
    let toast = document.getElementById("toast");
    let toastMsg = document.getElementById("toast-message");
    if (toast && toastMsg) {
        toastMsg.innerHTML = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }
}

displayEquipments();