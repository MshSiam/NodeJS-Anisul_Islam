const express = require("express")
const app = express()

// get //

app.get("/", (req, res) => {
  res.send("getting request")
})

//  post //
app.post("/", (req, res) => {
  res.send("post req")
})

//  put //
app.put("/", (req, res) => {
  res.send("put req")
})

//  delete //
app.delete("/", (req, res) => {
  res.send("delete req")
})

module.exports = app
