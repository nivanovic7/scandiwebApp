require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const Product = require("./models/product");
const bodyParser = require("body-parser");

const dbUri =
  "mongodb+srv://admin-nikola:8zzcvyey9PoPublY@cluster0.7ez59.mongodb.net/productsApp?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(dbUri)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/products", (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

app.delete("/products/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.send("Deleted");
    })
    .catch((err) => console.log(err));
});

app.post("/products", (req, res) => {
  const product = new Product(req.body);
  product
    .save()
    .then((result) => res.send("Saved"))
    .catch((err) => console.log(err));
});
