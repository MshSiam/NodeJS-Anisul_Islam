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

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }))

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile"
  }),
  function (req, res) {
    // Successful authentication, redirect home.
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
  res.render("profile", { username: req.user.username })
})

// --------- logout rout  ------------//
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
