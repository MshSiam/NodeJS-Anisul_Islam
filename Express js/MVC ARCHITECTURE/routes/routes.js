const express = require("express")
const { getHome, getUsers, saveUser } = require("../controllers/controller")
const router = express.Router()

// router//
router.get("/", getHome)
router.get("/users", getUsers)
router.post("/users", saveUser)

module.exports = router
