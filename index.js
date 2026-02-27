const endpoint = "https://kea-alt-del.dk/t7/api/categories";

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
      container.innerHTML += `<a class="cat" href="productlist.html">${kategori.category}</a>`;
    });
  }
}
getCat();
