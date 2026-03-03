console.log("productlist.js is connected");
const category = new URLSearchParams(window.location.search).get("category");
const endpoint = `https://kea-alt-del.dk/t7/api/products?limit=32&category=${category}`;

const nameContainer = document.querySelector(".catName");
const container = document.querySelector(".productlist");

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
  let markup = "";
  data.forEach((product) => {
    // console.log(product);
    markup += ` <a href="productdetails.html?id=${product.id}" class="item">
    <article class="product-card soldout">
    ${product.soldout ? `<span class="badge soldout">Udsolgt</span>` : ""}
   
             <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
              <h4>${product.brandname}</h4>
              <h3>${product.productdisplayname}</h3>
              <p class="price">

               ${product.discount ? `<span class="old-price">${product.price} kr.</span>` : `${product.price} kr.`}
               ${product.discount ? `<span class="new-price">${product.discount}%</span>` : ""}
               ${product.discount ? `<span class="final-price"> ${(product.price * product.discount) / 100} kr.</span>` : ""}
              </p>
                 </article>
            </a>`;
  });

  container.innerHTML = markup;
}
getPro();
