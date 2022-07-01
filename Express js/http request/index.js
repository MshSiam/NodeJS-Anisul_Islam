const express = require("express")
const app = express()
const PORT = process.env.local || 3000

const server = app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})

// ---------------------send value using query parameters. --------------------

// app.get("/", (req, res) => {
//   const id = req.query.id
//   const age = req.query.age
//   res.send(`<h1>user id is : ${id}</h1>
//   <h2>age : ${age}</h2>
//   `)
// })

// ------------------route parameter --------------------------

// app.get("/users/:id/age/:age", (req, res) => {
//   const id = req.params.id
//   const age = req.params.age
//   res.send(`<h3>User id is : ${id} and age is :${age}</h3>`)
// })

//  -------------- send valuse using headers ---------------
app.get("/", (req, res) => {
  const id = req.header("id")
  const name = req.header("name")
  res.send(`<h3>User id is : ${id} and name is :${name}</h3>`)
})
