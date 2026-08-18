const foods = [

  {
    id: 1,
    name: "Jollof Rice",
    category: "rice",
    price: 3000,
    description: "Rich, smoky Nigerian jollof rice.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 2,
    name: "Fried Rice",
    category: "rice",
    price: 3500,
    description: "Colourful fried rice prepared with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 3,
    name: "White Rice",
    category: "rice",
    price: 3000,
    description: "Soft steamed white rice.",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 4,
    name: "Egusi Soup",
    category: "soup",
    price: 3500,
    description: "Rich Nigerian egusi soup with delicious seasoning.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 5,
    name: "Efo Riro",
    category: "soup",
    price: 3500,
    description: "Traditional Yoruba vegetable soup.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 6,
    name: "Ogbono Soup",
    category: "soup",
    price: 3500,
    description: "Delicious traditional Nigerian ogbono soup.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 7,
    name: "Okro Soup",
    category: "soup",
    price: 3000,
    description: "Fresh Nigerian okro soup.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 8,
    name: "Amala",
    category: "swallow",
    price: 3000,
    description: "Soft traditional amala.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 9,
    name: "Pounded Yam",
    category: "swallow",
    price: 3500,
    description: "Smooth traditional pounded yam.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 10,
    name: "Semo",
    category: "swallow",
    price: 3000,
    description: "Smooth semolina swallow.",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 11,
    name: "Chicken",
    category: "protein",
    price: 3000,
    description: "Well seasoned chicken.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 12,
    name: "Fish",
    category: "protein",
    price: 4000,
    description: "Freshly grilled fish.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 13,
    name: "Beef",
    category: "protein",
    price: 3000,
    description: "Tender seasoned beef.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
  },

  {
    id: 14,
    name: "Turkey",
    category: "protein",
    price: 4000,
    description: "Delicious seasoned turkey.",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=900&q=85"
  }

];


let cart = [];

let currentFood = null;

let selectedPortion = 1;

let orderQuantity = 1;

let receiveMethod = "delivery";

let customer = {};

let currentOrderNumber = "";


function money(number) {
  return number.toLocaleString("en-NG");
}


function goToMenu() {
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth"
  });
}


function renderMenu(category = "all") {

  const menu = document.getElementById("menu-list");

  menu.innerHTML = "";

  let list = foods;

  if (category !== "all") {
    list = foods.filter(food => food.category === category);
  }

  list.forEach(food => {

    menu.innerHTML += `

      <div class="food-card">

        <img src="${food.image}" alt="${food.name}">

        <div class="food-info">

          <h3>${food.name}</h3>

          <p>${food.description}</p>

          <div class="food-bottom">

            <span class="food-price">
              From ₦${money(food.price)}
            </span>

            <button
              class="order-btn"
              onclick="openFood(${food.id})">
              Order
            </button>

          </div>

        </div>

      </div>

    `;

  });

}


function filterMenu(category, button) {

  document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");

  renderMenu(category);

}


function openFood(id) {

  currentFood = foods.find(food => food.id === id);

  selectedPortion = 1;

  orderQuantity = 1;

  document.getElementById("order-image").src = currentFood.image;

  document.getElementById("order-name").textContent = currentFood.name;

  document.getElementById("order-description").textContent =
    currentFood.description;

  document.getElementById("price1").textContent =
    "₦" + money(currentFood.price);

  document.getElementById("price2").textContent =
    "₦" + money(currentFood.price * 2);

  document.getElementById("price3").textContent =
    "₦" + money(currentFood.price * 3);

  document.getElementById("order-quantity").textContent = "1";

  document.querySelectorAll(".portion-buttons button")
    .forEach(btn => btn.classList.remove("selected"));

  document.querySelector(".portion-buttons button")
    .classList.add("selected");

  updateOrderTotal();

  openScreen("order-screen");

}


function selectPortion(portion, button) {

  selectedPortion = portion;

  document.querySelectorAll(".portion-buttons button")
    .forEach(btn => btn.classList.remove("selected"));

  button.classList.add("selected");

  updateOrderTotal();

}


function changeOrderQuantity(amount) {

  orderQuantity += amount;

  if (orderQuantity < 1) {
    orderQuantity = 1;
  }

  document.getElementById("order-quantity").textContent =
    orderQuantity;

  updateOrderTotal();

}


function getProtein() {

  const selected =
    document.querySelector('input[name="protein"]:checked');

  return {
    price: Number(selected.value),
    name: selected.dataset.name
  };

}


function updateOrderTotal() {

  const protein = getProtein();

  const oneOrder =
    (currentFood.price * selectedPortion) + protein.price;

  const total =
    oneOrder * orderQuantity;

  document.getElementById("order-total").textContent =
    money(total);

}


document.addEventListener("change", function(event) {

  if (event.target.name === "protein") {
    updateOrderTotal();
  }

});


function addToCart() {

  const protein = getProtein();

  const itemPrice =
    (currentFood.price * selectedPortion) + protein.price;

  cart.push({

    id: Date.now(),

    foodId: currentFood.id,

    name: currentFood.name,

    portion: selectedPortion,

    quantity: orderQuantity,

    protein: protein.name,

    total: itemPrice * orderQuantity,

    image: currentFood.image

  });

  updateCart();

  closeOrder();

  showCart();

}


function updateCart() {

  const container =
    document.getElementById("cart-items");

  container.innerHTML = "";

  let foodTotal = 0;

  let itemCount = 0;

  cart.forEach(item => {

    foodTotal += item.total;

    itemCount += item.quantity;

    container.innerHTML += `

      <div class="cart-row">

        <img src="${item.image}">

        <div>

          <h4>${item.name}</h4>

          <p>
            ${item.portion} spoon(s) × ${item.quantity}
          </p>

          <p>
            Protein: ${item.protein}
          </p>

          <strong>
            ₦${money(item.total)}
          </strong>

        </div>

        <button
          class="remove"
          onclick="removeItem(${item.id})">
          Remove
        </button>

      </div>

    `;

  });


  if (cart.length === 0) {

    container.innerHTML = `
      <p style="text-align:center;padding:30px;color:#777">
        Your cart is empty.
      </p>
    `;

  }


  document.getElementById("cart-count").textContent =
    itemCount;

  document.getElementById("food-total").textContent =
    money(foodTotal);

  let delivery = 0;

  if (receiveMethod === "delivery" && cart.length > 0) {
    delivery = 500;
  }

  document.getElementById("delivery-total").textContent =
    money(delivery);

  document.getElementById("grand-total").textContent =
    money(foodTotal + delivery);

}


function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

  updateCart();

}


function showCart() {

  updateCart();

  openScreen("cart-screen");

}


function closeCart() {

  closeScreen("cart-screen");

}


function openCheckout() {

  if (cart.length === 0) {

    alert("Please select food first.");

    return;

  }

  closeCart();

  openScreen("checkout-screen");

}


function closeCheckout() {

  closeScreen("checkout-screen");

}


function chooseReceive(method) {

  receiveMethod = method;

  document.getElementById("delivery-option")
    .classList.remove("selected");

  document.getElementById("pickup-option")
    .classList.remove("selected");


  if (method === "delivery") {

    document.getElementById("delivery-option")
      .classList.add("selected");

    document.getElementById("address-container")
      .style.display = "block";

  } else {

    document.getElementById("pickup-option")
      .classList.add("selected");

    document.getElementById("address-container")
      .style.display = "none";

  }

  updateCart();

}


function goToPayment() {

  const name =
    document.getElementById("customer-name").value.trim();

  const phone =
    document.getElementById("customer-phone").value.trim();

  const address =
    document.getElementById("customer-address").value.trim();


  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!phone) {
    alert("Please enter your phone number.");
    return;
  }

  if (receiveMethod === "delivery" && !address) {

    alert("Please enter your delivery address.");

    return;

  }


  customer = {

    name: name,

    phone: phone,

    address: address,

    method: receiveMethod,

    time: document.getElementById("order-time").value

  };


  const total = calculateGrandTotal();

  document.getElementById("payment-total").textContent =
    money(total);

  closeCheckout();

  openScreen("payment-screen");

}


function calculateGrandTotal() {

  const foodTotal =
    cart.reduce((sum, item) => sum + item.total, 0);

  const delivery =
    receiveMethod === "delivery" ? 500 : 0;

  return foodTotal + delivery;

}


function closePayment() {

  closeScreen("payment-screen");

}


function confirmOrder() {

  currentOrderNumber =
    "MUK-" + Math.floor(10000 + Math.random() * 90000);


  const total = calculateGrandTotal();


  document.getElementById("order-number").textContent =
    currentOrderNumber;

  document.getElementById("confirm-name").textContent =
    customer.name;

  document.getElementById("confirm-phone").textContent =
    customer.phone;

  document.getElementById("confirm-method").textContent =
    customer.method === "delivery"
      ? "Delivery"
      : "Pickup";

  document.getElementById("confirm-total").textContent =
    money(total);


  const message =

    `Hello Mama Unique Kitchen 👋\n\n` +

    `I have placed an order.\n\n` +

    `Order Number: ${currentOrderNumber}\n` +

    `Name: ${customer.name}\n` +

    `Phone: ${customer.phone}\n` +

    `Method: ${customer.method}\n` +

    `Total: ₦${money(total)}\n` +

    `Time: ${customer.time}\n\n` +

    `Order:\n` +

    cart.map(item =>
      `${item.name} - ${item.portion} spoon(s) x ${item.quantity} - ${item.protein}`
    ).join("\n");


  document.getElementById("whatsapp-order").href =
    "https://wa.me/2348161683794?text=" +
    encodeURIComponent(message);


  closePayment();

  openScreen("confirmation-screen");

}


function showTracking() {

  document.getElementById("tracking-number").textContent =
    currentOrderNumber;

  closeScreen("confirmation-screen");

  openScreen("tracking-screen");

}


function closeTracking() {

  closeScreen("tracking-screen");

}


function closeOrder() {

  closeScreen("order-screen");

}


function backHome() {

  closeScreen("confirmation-screen");

  cart = [];

  updateCart();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function openScreen(id) {

  document.getElementById(id)
    .classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeScreen(id) {

  document.getElementById(id)
    .classList.remove("open");

  const screens =
    document.querySelectorAll(".screen.open");

  if (screens.length === 0) {
    document.body.style.overflow = "";
  }

}


renderMenu();

chooseReceive("delivery");
