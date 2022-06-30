const express = require("express")
const app = express()
const PORT = process.env.local || 3000

const server = app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})

// send value using query parameters.

app.get("/", (req, res) => {
  const id = req.query.id
  const age = req.query.age
  res.send(`<h1>user id is : ${id}</h1>
  <h2>age : ${age}</h2>
  `)
})

// route parameter
