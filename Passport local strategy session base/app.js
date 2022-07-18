const express = require("express")
require("dotenv").config()
require("./config/database")
require("./config/passport")
const cors = require("cors")
const ejs = require("ejs")
const app = express()
const bcrypt = require("bcrypt")
const saltRounds = 10
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const User = require("./models/user.model")

app.set("trust proxy", 1)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions"
    })
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// --------- base url -------------//
app.get("/", (req, res) => {
  res.render("index")
})

// --------- register : get ------------//
app.get("/register", (req, res) => {
  res.render("register")
})

// --------- register : post ------------//
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(400).send("user already exist")
    }
    // hashing and salting //
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = new User({
        username: req.body.username,
        password: hash
      })
      await newUser.save()
      res.status(201).redirect("/login")
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// middlewere to check login //

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile")
  }
  next()
}

// --------- login : get ------------//
app.get("/login", checkLoggedIn, (req, res) => {
  res.render("login")
})
// --------- login : post ------------//
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile"
  }),
  function (req, res) {
    res.redirect("/")
  }
)

// middlewere to check authentication //

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.render("login")
}

// --------- profile : protected route ------------//
app.get("/profile", checkAuthenticated, (req, res) => {
  res.render("profile")
})

// --------- login : post ------------//
app.get("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
      res.redirect("/")
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = app
