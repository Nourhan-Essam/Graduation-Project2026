// 1. بيانات المنتجات (تأكدي إن الـ img هو اسم الصورة بالظبط)
const accessories = [
    { id: 301, title: 'Pro Mix Shaker', price: '$15.00', img: 'Pro max shaker.jfif', desc: '700ml | BPA Free' },
    // ضيفي باقي المنتجات هنا بنفس الطريقة
];

// 2. دالة عرض المنتجات في الصفحة
function displayAccessories() {
    const grid = document.getElementById('accessories-grid'); // تأكدي إن الـ ID ده موجود في الـ HTML
    if (!grid) return;

    grid.innerHTML = accessories.map(item => {
        let itemData = JSON.stringify(item).replace(/'/g, "\\'");
        return `
            <div class="acc-item-card">
                <img src="images/${item.img}" alt="${item.title}" class="acc-item-img">
                <div class="acc-item-content">
                    <h3>${item.title}</h3>
                    <p class="acc-item-price">${item.price}</p>
                    <button class="add-cart-light" onclick='addToCart(${itemData}, this)'>Add to Cart</button>
                </div>
            </div>`;
    }).join('');
}

// 3. الكود اللي إنتِ بعتيه (الإضافة والتوست)
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let finalImageUrl = item.img;
    
    // لو الصورة مش لينك (يعني مش بتبدأ بـ http)، حط مسار الفولدر
    if (item.img && !item.img.startsWith('http') && !item.img.startsWith('data:')) {
        finalImageUrl = "../images/" + item.img;
    }

    const itemForCart = {
        id: item.id,
        title: item.title,
        price: item.price,
        // بنبعت الوصف بالاسمين عشان الـ undefined تختفي في أي حال
        description: item.desc || "Premium Gym Gear",
        desc: item.desc || "Premium Gym Gear",
        imageUrl: finalImageUrl
    };

    cart.push(itemForCart);
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast(`${itemForCart.title} Added! ✅`);
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
displayAccessories();