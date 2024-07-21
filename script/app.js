document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const logoutButton = document.getElementById("logoutButton");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  const products = [
    {
      id: 1,
      name: "ERBOLOGY",
      image: "1.jpg",
      description: "it helps you to protect your skin",
      price: 35,
    },
    {
      id: 2,
      name: "HEADPHONE",
      image: "2.jpg",
      description: "to disconnect with the world",
      price: 15,
    },

    {
      id: 3,
      name: "PRODUCTS ALMONGO",
      image: "3.jpg",
      description: "to be more pretty",
      price: 90,
    },

    {
      id: 4,
      name: "ALMONGO HOUR",
      image: "4.jpg",
      description: "always in time",
      price: 40,
    },
    {
      id: 5,
      name: "GRAP",
      image: "5.jpg",
      description: "keep you and your phone save",
      price: 60,
    },
    {
      id: 6,
      name: "MILIZE",
      image: "6.jpg",
      description: "keeping you fresh",
      price: 60,
    },
    {
      id: 7,
      name: "K3B",
      image: "7.jpg",
      description: "be more taller",
      price: 40,
    },
    {
      id: 8,
      name: "RI7A",
      image: "8.jpg",
      description: "never empty your perfome",
      price: 20,
    },
    {
      id: 9,
      name: "CHANNEL",
      image: "9.jpg",
      description: "be attractive with channel",
      price: 90,
    },
  ];

  // GET USER FROM LOCAL
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = localStorage.getItem("user");
  if (!user && window.location.pathname !== "/login.html") {
    window.location.href = "login.html";
  }

  if (welcomeMessage && user) {
    const userName = user.split("@")[0];
    welcomeMessage.textContent = `Welcome, ${userName} 💓`;
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;

      if (email && password) {
        localStorage.setItem("user", email);
        window.location.href = "index.html";
      } else {
        alert("Please enter a valid credentials");
      }
    });
  }

  // LOGOUT
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }

  // LOADING PRODUCTS
  function loadProducts() {
    productList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
            <img src="./images/${product.image}" alt="${product.name}">
            <div class="productStaff">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
      productList.appendChild(productDiv);
    });
  }

  // ADD PRODUCT TO CART
  window.addToCart = function (productId) {
    const product = products.find((prod) => prod.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

    alert("the product is added");
  };

  // UPDATE THE DISPLAY OF CARD
  function updateCart() {
    if (cartList) {
      cartList.innerHTML = "";
      let total = 0;
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
              <img  src="./images/${item.image}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>Price: $${item.price}</p>
              <button onclick="removeFromCart(${item.id})">Remove</button>
          `;
        cartList.appendChild(cartItem);
        total += item.price;
      });
      cartTotal.textContent = `Total: $${total}`;
    }
  }

  // REMOVE PRODUCT FROM CART
  window.removeFromCart = function (productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    alert("Please enter a valid credentials");
  };

  if (productList) {
    loadProducts();
  }

  if (cartList) {
    updateCart();
  }
});
