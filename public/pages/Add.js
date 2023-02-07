const Add = {
  render: () => {
    return `<h2 class="page-title">Add products</h2>
    <hr>
    <form class="add-product">

    <div class="form-group">
    <label for="sku">
      SKU
      </label>
      <input required id="sku" type="text" value="" name="sku" />
      </div>
    <div class="form-group">  
    <label for="name">
      Title
      </label>
      <input required id="title" value="" type="text" name="title" />
    </div>
    <div class="form-group">  
    <label for="price">
      Price
      </label>
      <input required id="price" value="" type="text" name="price" />
    </div>

    <label
      >Choose a type:
      <select required class="type-switcher" id="type-switcher">
        <option value="">Type switcher</option>
        <option value="size">Size</option>
        <option value="weight">Weight</option>
        <option value="dimension">Dimension</option>
      </select>
    </label>

    <div class="dynamic-form"> </div>
<button class="submit-btn" type="submit">submit</button>
  </form>`;
  },

  generateNewFormHtml: (type) => {
    console.log(type);
    return `
      <div class="form-group">  
      ${type
        .map((item) => {
          return `
        <label for="${item}">
      ${item}
      </label>
      <input required id="${item}" type="text" name="${item}" />
      `;
        })
        .join("")}
    </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, nue.</p>
  `;
  },

  generateNewForm: function () {
    const dynamicForm = document.querySelector(".dynamic-form");

    const type =
      this.value === "dimension" ? ["height", "width", "length"] : [this.value];

    dynamicForm.innerHTML = Add.generateNewFormHtml(type);
  },

  collectAndPostFormData: function (e) {
    e.preventDefault();
    const itemType = document.querySelector(".type-switcher").value;
    const formData = Object.fromEntries(new FormData(this));
    let specs;

    if (itemType === "dimension")
      specs = `Dimension: ${formData.width}x${formData.height}x${formData.length}`;
    if (itemType === "size") specs = `Size: ${formData.size} mb`;
    if (itemType === "weight") specs = `Weight: ${formData.weight} kg`;

    const dataItem = {
      sku: formData.sku,
      title: formData.title,
      price: formData.price + "$",
      specs: specs,
    };

    Add.postData(dataItem);
  },

  afterRender: () => {
    const typeSwitcher = document.querySelector(".type-switcher");
    const addProductForm = document.querySelector(".add-product");

    typeSwitcher.addEventListener("change", Add.generateNewForm);
    addProductForm.addEventListener("submit", Add.collectAndPostFormData);
  },

  postData: function (data) {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        cors: "cors",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        window.location.hash = "view";
      })
      .catch((err) => console.log(err));
  },
};

export default Add;
