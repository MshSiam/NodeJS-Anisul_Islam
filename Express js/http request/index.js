const express = require("express")
const app = express()
const PORT = process.env.local || 3000
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

// =============== Make post request with json or format data ===========================
// error fixed.

app.post("/user", (req, res) => {
  const name = req.body.name
  const age = req.body.age
  res.send(`welcome ${name}. he is ${age} years old`)
})

// ---------------------send value using query parameters. --------------------

// app.get("/", (req, res) => {
//   const id = req.query.id
//   const age = req.query.age
//   res.send(`<h1>user id is : ${id}</h1>
//   <h2>age : ${age}</h2>
//   `)
// })

// =================================================================

// ------------------route parameter --------------------------

// app.get("/users/:id/age/:age", (req, res) => {
//   const id = req.params.id
//   const age = req.params.age
//   res.send(`<h3>User id is : ${id} and age is :${age}</h3>`)
// })

//  -------------- send valuse using headers ---------------
// app.get("/", (req, res) => {
//   const id = req.header("id")
//   const name = req.header("name")
//   res.send(`<h3>User id is : ${id} and name is :${name}</h3>`)
// })

// =============================================================
// send and recive data in form-------------------------

// -----------get------------
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/form.html")
})

// ----------post-------------
app.post("/register", (req, res) => {
  const name = req.body.fullName
  const age = req.body.age
  res.send(`<h2>Your name is ${name}, age ${age}</h2>`)
})

const server = app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
