import data from "./data.js";

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
  renderNewForm: (type) => {
    if (!type) return;
    if (type === "size") {
      return `
      <div class="form-group">  
    <label for="size">
      Size
      </label>
      <input required id="size" type="text" name="size" />
    </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, rem.</p>
  `;
    }
    if (type === "weight") {
      return ` <div class="form-group">  
      <label for="weight">
        Weight
        </label>
        <input required id="weight" type="text" name="weight" />
      </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, rem.</p>
  `;
    }
    if (type === "dimension") {
      return ` <div class="form-group">  
      <label for="width">
        Width
        </label>
        <input required id="width" type="text" name="width" />
      </div> <div class="form-group">  
      <label for="height">
        Height
        </label>
        <input required id="height" type="text" name="height" />
      </div> <div class="form-group">  
      <label for="length">
        Length
        </label>
        <input required id="length" type="text" name="length" />
      </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, rem.</p>
    
    `;
    }
  },

  afterRender: () => {
    const typeSwitcher = document.querySelector(".type-switcher");
    const dynamicForm = document.querySelector(".dynamic-form");

    typeSwitcher.addEventListener("change", function () {
      const type = this.value;
      const html = Add.renderNewForm(type);
      dynamicForm.innerHTML = html;
    });

    document
      .querySelector(".add-product")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(this));
        let specs;
        const itemType = document.querySelector(".type-switcher").value;

        if (itemType === "dimension")
          specs = `Dimension: ${formData.width}x${formData.height}x${formData.length}`;
        if (itemType === "size") specs = `Size: ${formData.size}mb`;
        if (itemType === "weight") specs = `Weight: ${formData.weight}kg`;

        console.log(formData);
        const dataItem = {
          sku: formData.sku,
          title: formData.title,
          price: formData.price + "$",
          specs: specs,
        };
        Add.postData(dataItem);
      });
  },

  postData: function (data) {
    console.log(data);
    const req = fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        cors: "cors",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      window.location.hash = "view";
    });
  },
};

export default Add;
