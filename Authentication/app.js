const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.port || port

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.listen(port, () => {
  console.log(`running at ${port}`)
})
