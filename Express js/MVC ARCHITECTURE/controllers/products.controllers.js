const products = require("../models/products.model")
const path = require("path")

exports.getProducts = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/product.html"))
}

// post //
exports.saveProducts = (req, res) => {
  const name = req.body.name
  const price = Number(req.body.price)
  const product = {
    name,
    price
  }
  products.push(product)
  res.status(201).json({
    sucess: true,
    products
  })
}
