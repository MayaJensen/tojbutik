const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const productsEndpoint = "https://kea-alt-del.dk/t7/api/products";
const container = document.querySelector(".categories");

function getCat() {
  {
    fetch(endpoint)
      .then((category) => category.json())
      .then(showData);
  }

  function showData(data) {
    console.log(data);
    data.forEach((kategori) => {
      container.innerHTML += `<a class="cat" href="productlist.html?category=${kategori.category}">${kategori.category}</a>`;
    });
  }
}
getCat();

const newsGallery = document.querySelector(".newsGallery");

function getNewestProducts() {
  fetch(productsEndpoint)
    .then((res) => res.json())
    .then(showNewestProducts);
}

function showNewestProducts(data) {
  newsGallery.innerHTML = "";

  data
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .forEach((product) => {
      newsGallery.innerHTML += `
        <article class="product-card ${product.soldout ? "soldout" : ""}">
          <a href="productdetails.html?id=${product.id}" class="item">
            <span class="badge new">New</span>
            ${
              product.soldout
                ? `<span class="badge soldout">Udsolgt</span>`
                : ""
            }
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="">
            <h4>${product.brandname}</h4>
            <h3>${product.productdisplayname}</h3>
            <p class="price">${product.price} kr.</p>
          </a>
        </article>
      `;
    });
}

getNewestProducts();
