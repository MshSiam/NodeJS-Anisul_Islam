const express = require("express")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt")
const saltRounds = 10
require("./config/database")
require("dotenv").config()
const User = require("./models/user.model")
const jwt = require("jsonwebtoken")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// -------------base url ------------//
app.get("/", (req, res) => {
  res.send("<h1>Welcome to server</h1>")
})

// ---------- register route ---------//
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(400).send("User already exist")
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = new User({
        username: req.body.username,
        password: hash
      })
      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "user created successfully",
            user: {
              id: user._id,
              username: user.username
            }
          })
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "user is not created",
            error: error
          })
        })
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})
// ---------- login route ---------//
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "user is not found"
    })
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect Password"
    })
  }
  const payload = {
    id: user._id,
    username: user.username
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "2d"
  })
  return res.status(200).send({
    success: true,
    message: "successfully logged in",
    token: "Bearer" + token
  })
})

// ---------- profile route (procted)---------//
app.get("/profile", (req, res) => {
  res.send("<h1>Welcome to profile</h1>")
})

// -------error handling --------//

// ------------- client error-------//
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found"
  })
})
// ------------- server error-------//
app.use((err, req, res, next) => {
  res.status(500).send("something broke")
})

module.exports = app
