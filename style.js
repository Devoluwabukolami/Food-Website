const foods = [

    {
        id: 1,
        name: "Jollof Rice",
        category: "rice",
        price: 3000,
        description: "Rich Nigerian party-style jollof rice.",
        image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Fried Rice",
        category: "rice",
        price: 3500,
        description: "Colourful Nigerian fried rice packed with flavour.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "White Rice",
        category: "rice",
        price: 3000,
        description: "Steamed white rice served with your choice of protein.",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Egusi Soup",
        category: "soup",
        price: 3500,
        description: "Rich and delicious Nigerian egusi soup.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Efo Riro",
        category: "soup",
        price: 3500,
        description: "Traditional Yoruba vegetable soup cooked with peppers and protein.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Ogbono Soup",
        category: "soup",
        price: 3500,
        description: "Delicious draw soup made with ground ogbono.",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Okro Soup",
        category: "soup",
        price: 3000,
        description: "Fresh Nigerian okro soup prepared with rich ingredients.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Amala",
        category: "swallow",
        price: 3000,
        description: "Soft amala served with your favourite Nigerian soup.",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 9,
        name: "Pounded Yam",
        category: "swallow",
        price: 3500,
        description: "Smooth traditional pounded yam.",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 10,
        name: "Semo",
        category: "swallow",
        price: 3000,
        description: "Smooth semolina swallow.",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 11,
        name: "Chicken",
        category: "protein",
        price: 3000,
        description: "Well-seasoned juicy chicken.",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 12,
        name: "Grilled Fish",
        category: "protein",
        price: 4000,
        description: "Freshly grilled and seasoned fish.",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 13,
        name: "Beef",
        category: "protein",
        price: 3000,
        description: "Tender seasoned beef.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 14,
        name: "Turkey",
        category: "protein",
        price: 4000,
        description: "Delicious seasoned turkey.",
        image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=800&q=80"
    }

];


let cart = [];

let selectedFood = null;

let selectedQuantity = 1;

let deliveryMethod = "delivery";

let customer = {};



function displayFoods(category = "all") {

    const grid = document.getElementById("foodGrid");

    grid.innerHTML = "";

    const filtered = category === "all"
        ? foods
        : foods.filter(food => food.category === category);


    filtered.forEach(food => {

        grid.innerHTML += `

            <div class="food-card">

                <img src="${food.image}" alt="${food.name}">

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="food-bottom">

                        <span class="food-price">
                            From ₦${food.price.toLocaleString()}
                        </span>

                        <button
                            class="food-order"
                            onclick="openFood(${food.id})">
                            Order
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}



function filterFood(category) {

    document.querySelectorAll(".category")
        .forEach(button => button.classList.remove("active"));

    event.target.classList.add("active");

    displayFoods(category);

}



function openFood(id) {

    selectedFood = foods.find(food => food.id === id);

    selectedQuantity = 1;

    document.getElementById("modalImage").src = selectedFood.image;

    document.getElementById("modalName").textContent = selectedFood.name;

    document.getElementById("modalDescription").textContent =
        selectedFood.description;

    document.getElementById("modalPrice").textContent =
        selectedFood.price.toLocaleString();

    document.getElementById("quantity").textContent = 1;

    document.getElementById("proteinSelect").value = 0;

    document.getElementById("foodModal").classList.add("show");

}



function closeFood() {

    document.getElementById("foodModal").classList.remove("show");

}



function changeQuantity(amount) {

    selectedQuantity += amount;

    if (selectedQuantity < 1) {
        selectedQuantity = 1;
    }

    document.getElementById("quantity").textContent =
        selectedQuantity;

}



function addToCart() {

    const proteinPrice =
        Number(document.getElementById("proteinSelect").value);

    const proteinName =
        document.getElementById("proteinSelect")
        .selectedOptions[0].text;


    const total =
        (selectedFood.price + proteinPrice) * selectedQuantity;


    cart.push({

        id: Date.now(),

        foodId: selectedFood.id,

        name: selectedFood.name,

        quantity: selectedQuantity,

        protein: proteinName,

        total: total,

        image: selectedFood.image

    });


    updateCart();

    closeFood();

    openCart();

}



function updateCart() {

    document.getElementById("cartCount").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);


    const container =
        document.getElementById("cartItems");

    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;color:#777;padding:40px 0">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <small>
                        ${item.quantity} portion(s)
                    </small>

                    <br>

                    <small>
                        ${item.protein}
                    </small>

                    <p>
                        ₦${item.total.toLocaleString()}
                    </p>

                </div>

                <button
                    class="remove"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>

        `;

    });


    document.getElementById("cartTotal").textContent =
        calculateTotal().toLocaleString();

}



function calculateTotal() {

    return cart.reduce((sum, item) =>
        sum + item.total, 0);

}



function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}



function openCart() {

    document.getElementById("cartPanel")
        .classList.add("open");

}



function closeCart() {

    document.getElementById("cartPanel")
        .classList.remove("open");

}



function checkout() {

    if (cart.length === 0) {

        alert("Please add food to your order first.");

        return;

    }

    closeCart();

    document.getElementById("checkoutModal")
        .classList.add("show");

}



function closeCheckout() {

    document.getElementById("checkoutModal")
        .classList.remove("show");

}



function selectDelivery(method) {

    deliveryMethod = method;

    document.getElementById("deliveryBtn")
        .classList.remove("selected");

    document.getElementById("pickupBtn")
        .classList.remove("selected");


    if (method === "delivery") {

        document.getElementById("deliveryBtn")
            .classList.add("selected");

        document.getElementById("addressBox")
            .style.display = "block";

    } else {

        document.getElementById("pickupBtn")
            .classList.add("selected");

        document.getElementById("addressBox")
            .style.display = "none";

    }

}



function continuePayment() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();


    if (!name || !phone) {

        alert("Please enter your name and phone number.");

        return;

    }


    if (deliveryMethod === "delivery" && !address) {

        alert("Please enter your delivery address.");

        return;

    }


    customer = {

        name: name,

        phone: phone,

        address: address,

        method: deliveryMethod,

        time: document.getElementById("orderTime").value

    };


    document.getElementById("paymentAmount").textContent =
        calculateTotal().toLocaleString();


    closeCheckout();

    document.getElementById("paymentModal")
        .classList.add("show");

}



function closePayment() {

    document.getElementById("paymentModal")
        .classList.remove("show");

}



function confirmOrder() {

    const orderNumber =
        "MUK-" + Math.floor(10000 + Math.random() * 90000);


    document.getElementById("orderNumber").textContent =
        orderNumber;

    document.getElementById("trackingNumber").textContent =
        orderNumber;

    document.getElementById("confirmName").textContent =
        customer.name;

    document.getElementById("confirmPhone").textContent =
        customer.phone;

    document.getElementById("confirmMethod").textContent =
        customer.method === "delivery"
            ? "Delivery"
            : "Pickup";


    const message =
        `Hello Mama Unique Kitchen 👋%0A%0A` +
        `I have placed an order.%0A` +
        `Order Number: ${orderNumber}%0A` +
        `Name: ${customer.name}%0A` +
        `Phone: ${customer.phone}%0A` +
        `Order Total: ₦${calculateTotal().toLocaleString()}%0A` +
        `Method: ${customer.method}%0A` +
        `${customer.address ? "Address: " + customer.address : ""}`;


    document.getElementById("orderWhatsapp").href =
        `https://wa.me/2348161683794?text=${message}`;


    closePayment();

    document.getElementById("confirmationModal")
        .classList.add("show");

}



function trackOrder() {

    document.getElementById("confirmationModal")
        .classList.remove("show");

    document.getElementById("trackingModal")
        .classList.add("show");

}



function closeTracking() {

    document.getElementById("trackingModal")
        .classList.remove("show");

}



function backHome() {

    document.getElementById("confirmationModal")
        .classList.remove("show");

    cart = [];

    updateCart();

    window.location.href = "#home";

}



displayFoods();

selectDelivery("delivery");