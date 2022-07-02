const users = require("../models/model")
const path = require("path")

exports.getHome = (req, res) => {
  res.send("<h1>Hello developer.</h1>")
}

exports.getUsers = (req, res) => {
  res.sendFile(path.join(__dirname + "/../views/index.html"))
}

// post //
exports.saveUser = (req, res) => {
  const name = req.body.name
  const age = Number(req.body.age)
  const user = {
    name,
    age
  }
  users.push(user)
  res.status(201).json({
    sucess: true,
    users
  })
}
