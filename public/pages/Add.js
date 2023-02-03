const Add = {
  render: () => {
    return `<h2 class="page-title">Add products</h2>
    <hr>
    <form class="add-product">

    <div class="form-group">
    <label id="sku">
      SKU
      </label>
      <input required for="sku" type="text" name="sku" />
      </div>
    <div class="form-group">  
    <label id="name">
      Name
      </label>
      <input required for="name" type="text" name="name" />
    </div>
    <div class="form-group">  
    <label id="price">
      Price
      </label>
      <input required for="price" type="text" name="price" />
    </div>

    <label
      >Choose a car:
      <select class="type-switcher" id="type-switcher">
        <option value="">Type switcher</option>
        <option value="size">Size</option>
        <option value="weight">Weight</option>
        <option value="dimension">Dimension</option>
      </select>
    </label>

    <div class="dynamic-form"> </div>

  </form>`;
  },
  renderNewForm: (type) => {
    if (!type) return;
    if (type === "size") {
      return `
      <div class="form-group">  
    <label id="size">
      Size
      </label>
      <input required for="size" type="text" name="size" />
    </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, rem.</p>
  `;
    }
    if (type === "weight") {
      return ` <div class="form-group">  
      <label id="weight">
        Weight
        </label>
        <input required for="weight" type="text" name="weight" />
      </div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, rem.</p>
  `;
    }
    if (type === "dimension") {
      return ` <div class="form-group">  
      <label id="width">
        Width
        </label>
        <input required for="width" type="text" name="width" />
      </div> <div class="form-group">  
      <label id="height">
        Height
        </label>
        <input required for="height" type="text" name="height" />
      </div> <div class="form-group">  
      <label id="length">
        Length
        </label>
        <input required for="length" type="text" name="length" />
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
  },
};

export default Add;
