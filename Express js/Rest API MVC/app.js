const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html")
})

// default error handling
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not Found"
  })
})
// server error handling
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Server Error. Please try again letter"
  })
})

module.exports = app
