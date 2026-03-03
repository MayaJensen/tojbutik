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
          <h4>Nike</h4>
          <h1>Nike cap</h1>

          <p class="price">250 dkk</p>
          <p class="stock">På lager</p>

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
          <p>Lorem ipsum dolor sit amet...</p>

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
