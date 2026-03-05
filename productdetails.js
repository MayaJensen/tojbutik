console.log("productdetails.js is connected");

const id = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const productContainer = document.querySelector(".product-page");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showData);
}

function showData(product) {
  console.log(product);
  productContainer.innerHTML = `
  <div class="product-images">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
            alt=""
          />
        </div>

        <div class="product-info">
          <h4>${product.brandname}</h4>
          <h1>${product.productdisplayname}</h1>

         ${product.discount ? `<span class="old-price">${product.price} kr.</span>` : `${product.price} kr.`}
            ${product.discount ? `<span class="new-price">${product.discount}%</span>` : ""}
            ${product.discount ? `<span class="final-price">${(product.price - (product.price * product.discount) / 100).toFixed(2)} kr.</span>` : ""}
           ${product.soldout ? `<p class="nostock">Ikke på lager</p>` : `<p class="stock">På lager</p>`}

             <p class="price">
           
          </p>

          <hr />

          <div class="sizes">
            <p>Størrelse</p>
            <button>S</button>
            <button>M</button>
            <button>L</button>
          </div>

          <button class="add-to-cart">TILFØJ TIL KURV</button>

          <hr />

          <h3>Beskrivelse</h3>
          <p>${product.description}</p>

          <div class="accordion">
            <div class="row">
              <span>Leveringsinformation</span>
              <span>+</span>
            </div>
            <div class="row">
              <span>Returinfromation</span>
              <span>+</span>
            </div>
          </div>
        </div>`;
}

getData();
