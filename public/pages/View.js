const Views = {
  render: async () => {
    const data = await Views.getProducts();
    return `<h2 class="page-title">Wellcome to views </h2>
    <hr>
    <button class="delete-btn">Delete</button>
      <div class="grid">
        ${data
          .map((item) => {
            return `
          <div class="card" data-id="${item._id}">
            <p class="sku">${item.sku}</p>
            <p class="title">${item.title}</p>
            <p class="price">${item.price}</p>
            <p class="specification">${item.specs}</p>
            <div class="checkbox">
              <input type="checkbox" class="check-btn" />
            </div>
          </div>`;
          })
          .join("")}
    </div>`;
  },

  getProducts: async function () {
    const req = await fetch("http://localhost:3000/products");
    const res = await req.json();
    return res;
  },

  sendDeleteReq: function (id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  },

  deleteProduct: function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (card.querySelector(".check-btn").checked) {
        Views.sendDeleteReq(card.dataset.id);
      }
    });
    location.reload();
  },

  afterRender: () => {
    const deleteBtn = document.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", Views.deleteProduct);
  },
};

export default Views;
