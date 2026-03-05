console.log("productlist.js is connected");
const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?limit=32&category=${category}`;

const nameContainer = document.querySelector(".catName");
const container = document.querySelector(".productlist");

document
  .querySelectorAll("#sorter button")
  .forEach((knap) => knap.addEventListener("click", sorter));

document
  .querySelectorAll(".filter button")
  .forEach((knap) => knap.addEventListener("click", filter));

let allData;
let udsnit;

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      allData = udsnit = data;
      showProducts(allData);
    });
}

function filter(e) {
  const valgt = e.target.textContent;

  if (valgt === "All") {
    showProducts(allData);
  } else {
    udsnit = allData.filter((product) => product.gender === valgt);
    showProducts(udsnit);
  }
}
getData();

function getName() {
  nameContainer.textContent = category;
}
getName();

function getPro() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showProducts);
}
function showProducts(data) {
  if (data.length === 0) {
    container.innerHTML = `<div class="noProducts">Ingen produkter fundet</div>`;
    return;
  }

  let markup = "";

  data.forEach((product) => {
    markup += `
      <a href="productdetails.html?id=${product.id}" class="item">
        <article class="product-card ${product.soldout ? "soldout" : ""}">
          
          ${product.soldout ? `<span class="badge soldout">Udsolgt</span>` : ""}
          
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
          
          <h4>${product.brandname}</h4>
          <h3>${product.productdisplayname}</h3>

          <p class="price">
            ${product.discount ? `<span class="old-price">${product.price} kr.</span>` : `${product.price} kr.`}
            ${product.discount ? `<span class="new-price">${product.discount}%</span>` : ""}
            ${product.discount ? `<span class="final-price">${(product.price - (product.price * product.discount) / 100).toFixed(2)} kr.</span>` : ""}
          </p>

        </article>
      </a>
    `;
  });

  container.innerHTML = markup;
}
getPro();

function sorter(event) {
  if (event.target.dataset.price) {
    const dir = event.target.dataset.price;

    if (dir == "up") {
      udsnit.sort((a, b) => a.price - b.price);
    } else {
      udsnit.sort((a, b) => b.price - a.price);
    }
  } else {
    const dir = event.target.dataset.text;

    if (dir == "az") {
      udsnit.sort((a, b) =>
        a.productdisplayname.localeCompare(b.productdisplayname, "da"),
      );
    } else {
      udsnit.sort((a, b) =>
        b.productdisplayname.localeCompare(a.productdisplayname, "da"),
      );
    }
  }

  showProducts(udsnit);
}

const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const sortButtons = document.querySelectorAll("#sorter button");

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sortButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
