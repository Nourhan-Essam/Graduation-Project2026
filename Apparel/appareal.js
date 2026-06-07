const products = [
    { id: 501, category: "men", title: "Training T-Shirt", price: "$25.00", p: "High quality fabric", imageUrl: "men-wear.jpg3" },
    { id: 502, category: "children", title: "Junior Sport Set", price: "$20.00", p: "Comfortable for junior athletes", imageUrl: "kids-wear2.jpg" },
    { id: 503, category: "women", title: "Training Suit", price: "$30.00", p: "Elastic fabric", imageUrl: "women-wear.jpg" },
    { id: 504, category: "children", title: "Kids Training Set", price: "$20.00", p: "Comfortable for junior athletes", imageUrl: "kids-wear.jpg" },
    { id: 505, category: "men", title: "Training T-Shirt V2", price: "$25.00", p: "High quality fabric", imageUrl: "men-wear.jpg2" },
    { id: 506, category: "women", title: "Training Hoodie", price: "$26.00", p: "Elastic fabric", imageUrl: "trwomen.jpg" },
    { id: 507, category: "women", title: "Yoga Leggings", price: "$30.00", p: "Elastic fabric", imageUrl: "women-wear1.jpg" },
    { id: 508, category: "children", title: "Junior Sport Set V3", price: "$20.00", p: "Comfortable for junior athletes", imageUrl: "kids-wear3.jpg" },
    { id: 509, category: "men", title: "Training T-Shirt V3", price: "$25.00", p: "High quality fabric", imageUrl: "man1.jpg" },
    { id: 510, category: "women", title: "Activewear Tee", price: "$30.00", p: "Elastic fabric", imageUrl: "activate.jpg" },
    { id: 511, category: "men", title: "Training T-Shirt V4", price: "$25.00", p: "High quality fabric", imageUrl: "men-wear.jpg" },
    { id: 512, category: "women", title: "Yoga Leggings V2", price: "$40.00", p: "Elastic fabric", imageUrl: "women-wear2.jpg" },
    { id: 513, category: "children", title: "Junior Sport Set V4", price: "$20.00", p: "Comfortable for junior athletes", imageUrl: "kids-wear1.jpg" }
];

const productsGrid = document.querySelector('.products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderApparel(filterValue = 'all') {
    let filtered = products;
    if (filterValue !== 'all') {
        filtered = products.filter(p => p.category === filterValue);
    }

    const html = filtered.map(item => {

        let itemData = JSON.stringify(item).replace(/'/g, "\\'");
        return `
            <div class="product-card ${item.category}">
                <div class="product-img">
                    <img src="images/${item.imageUrl}" alt="${item.title}">
                </div>
                <div class="product-info">
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                    <button class="add-btn" onclick='addToCart(${itemData})'>ADD TO CART</button>
                </div>
            </div>`;
    }).join("");

    if(productsGrid) productsGrid.innerHTML = html;
}


function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let finalPath = "../../../Apparel/images/" + item.imageUrl;

    const itemForCart = {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.p || "", 
        desc: item.p || "",
        imageUrl: finalPath 
    };

    cart.push(itemForCart);
    localStorage.setItem("cart", JSON.stringify(cart));
    
    if (typeof showToast === "function") {
        showToast(`${itemForCart.title} Added! ✅`);
    }
}
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    if (toast && toastMsg) {
        toastMsg.innerText = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }
} 


filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.filter-btn.active');
        if(activeBtn) activeBtn.classList.remove('active');
        btn.classList.add('active');
        renderApparel(btn.getAttribute('data-filter'));
    });
});

renderApparel();