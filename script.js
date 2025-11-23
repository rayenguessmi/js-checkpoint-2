document.addEventListener("DOMContentLoaded", function () {
  initializeCart();
});

function initializeCart() {
  document.querySelectorAll(".quantity").forEach((quantityElement) => {
    quantityElement.textContent = "0";
  });

  updateTotalPrice();
  setupEventListeners();
}

function setupEventListeners() {
  document.querySelectorAll(".fa-plus-circle").forEach((plusBtn) => {
    plusBtn.addEventListener("click", function () {
      const quantityElement = this.parentElement.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;
      updateTotalPrice();
    });
  });

  document.querySelectorAll(".fa-minus-circle").forEach((minusBtn) => {
    minusBtn.addEventListener("click", function () {
      const quantityElement = this.parentElement.querySelector(".quantity");
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateTotalPrice();
      }
    });
  });

  document.querySelectorAll(".fa-trash-alt").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      const quantityElement =
        this.closest(".card-body").querySelector(".quantity");
      quantityElement.textContent = "0";
      updateTotalPrice();
    });
  });

  document.querySelectorAll(".fa-heart").forEach((heartBtn) => {
    heartBtn.addEventListener("click", function () {
      this.classList.toggle("fas");
      this.classList.toggle("far");
      if (this.classList.contains("fas")) {
        this.style.color = "red";
      } else {
        this.style.color = "black";
      }
    });
  });
}

function updateTotalPrice() {
  let total = 0;

  document.querySelectorAll(".quantity").forEach((quantityElement) => {
    const quantity = parseInt(quantityElement.textContent) || 0;
    const card = quantityElement.closest(".card");
    const priceElement = card.querySelector(".unit-price");

    if (priceElement) {
      const priceText = priceElement.textContent.split("$")[0].trim();
      const price = parseFloat(priceText) || 0;

      total += quantity * price;
    }
  });

  const totalElement = document.querySelector(".total");
  if (totalElement) {
    totalElement.textContent = total.toFixed(2) + " $";
  }
}

function resetCart() {
  document.querySelectorAll(".quantity").forEach((quantityElement) => {
    quantityElement.textContent = "0";
  });

  document.querySelectorAll(".fa-heart").forEach((heartBtn) => {
    heartBtn.classList.remove("fas");
    heartBtn.classList.add("far");
    heartBtn.style.color = "black";
  });

  updateTotalPrice();
}

function initializeSampleData() {
  const quantities = [1, 2, 0];

  document.querySelectorAll(".quantity").forEach((quantityElement, index) => {
    if (index < quantities.length) {
      quantityElement.textContent = quantities[index];
    }
  });

  const firstHeart = document.querySelector(".fa-heart");
  if (firstHeart) {
    firstHeart.classList.add("fas");
    firstHeart.style.color = "red";
  }

  updateTotalPrice();
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".form-control");
  const searchButton = document.querySelector(".btn-outline-success");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      performSearch(searchInput.value.trim().toLowerCase());
    });

    searchInput.addEventListener("input", function () {
      performSearch(this.value.trim().toLowerCase());
    });

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch(this.value.trim().toLowerCase());
      }
    });
  }
});

function performSearch(searchTerm) {
  const productContainers = document.querySelectorAll(
    ".list-products > .card-body"
  );

  productContainers.forEach((container) => {
    const productName = container
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const productDescription = container
      .querySelector(".card-text")
      .textContent.toLowerCase();

    if (
      searchTerm === "" ||
      productName.includes(searchTerm) ||
      productDescription.includes(searchTerm)
    ) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}
