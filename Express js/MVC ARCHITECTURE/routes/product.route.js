const express = require("express")
const {
  getProducts,
  saveProducts
} = require("../controllers/products.controllers")
const ProductRouter = express.Router()

// router//
ProductRouter.get("/products", getProducts)
ProductRouter.post("/products", saveProducts)

module.exports = ProductRouter
