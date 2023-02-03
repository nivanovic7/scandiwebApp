import data from "./data.js";

const Views = {
  render: () => {
    return `<h2 class="page-title">Wellcome to views</h2>
    <hr>
      <div class="grid">
        ${data
          .map((item) => {
            return `
          <div class="card" data-id="${item.id}">
            <p class="id">${item.id}</p>
            <p class="title">${item.title}</p>
            <p class="price">${item.price}</p>
            <p class="specification">${item.specs}</p>
            <div class="checkbox">
              <input type="checkbox" id="check-btn" />
            </div>
          </div>`;
          })
          .join("")}
    </div>`;
  },
};

export default Views;
