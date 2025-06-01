const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../handlers/product-handler");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let model = req.body;
    let product = await addProduct(model);
    res.send(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ error: "Failed to add product" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let model = req.body;
    let id = req.params["id"];
    await updateProduct(id, model);
    res.send({ message: "updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ error: "Failed to update product" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params["id"];
    await deleteProduct(id);
    res.send({ message: "deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ error: "Failed to delete product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params["id"];
    let product = await getProduct(id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ error: "Failed to fetch product" });
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await getAllProducts();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});

module.exports = router;
