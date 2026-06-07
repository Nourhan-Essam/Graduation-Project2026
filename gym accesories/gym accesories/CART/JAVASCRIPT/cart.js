let container = document.querySelector("#cart-items");
let subtotalElement = document.querySelector("#subtotal");
let totalElement = document.querySelector("#total");

function drawCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<h2 class="text-center w-100" style="color: #166088; margin-top: 50px;">Your Cart is Empty</h2>`;
        updateSummary(0);
        return;
    }

    cart.forEach((item, index) => {
        let priceNum = parseFloat(item.price.toString().replace(/[^\d.]/g, '')) || 0;
        let qty = parseInt(item.quantity) || 1;
        subtotal += (priceNum * qty);

       
        container.innerHTML += `
            <div class="col-md-12 mb-4">
                <div class="card shadow-sm" style="display: flex; flex-direction: row; align-items: center; border-radius: 15px; overflow: hidden; padding: 15px; border: 1px solid #eee;">
                    <img src="${item.imageUrl}" alt="${item.title}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 10px;" onerror="this.src='../../Gallery/fitness-placeholder.png'">
                    
                    <div class="card-body" style="padding-left: 20px; text-align: left;">
                        <h4 style="color: #166088; font-weight: bold; margin-bottom: 5px;">${item.title}</h4>
                        <p style="color: #777; font-size: 0.9rem; margin-bottom: 10px;">${item.description || item.desc || ""}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 1.1rem; font-weight: bold; color: #333;">${item.price} × ${qty}</span>
                            <span style="font-size: 1.2rem; font-weight: bold; color: #166088;">$${(priceNum * qty).toFixed(2)}</span>
                        </div>
                    </div>

                    <div class="actions">
                        <button class="btn btn-danger" onclick="removeItem(${index})" style="border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    let shipping = subtotal > 0 ? 50 : 0;
    subtotalElement.innerHTML = "$" + subtotal.toFixed(2);
    totalElement.innerHTML = "$" + (subtotal + shipping).toFixed(2);
    

    localStorage.setItem("totalAmount", (subtotal + shipping).toFixed(2));
}

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    drawCartItems(); 
};

document.addEventListener("DOMContentLoaded", drawCartItems);

const checkoutBtn = document.getElementById('checkout'); 
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        window.location.href = 'visa/visa.html';
    });
}