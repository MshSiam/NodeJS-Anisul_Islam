const express = require("express")
const app = express()
const PORT = 3000
const userRouter = require("./routes/routes")

app.use(express.urlencoded({ extended: true }))
// using the imported router
app.use(userRouter)

// setting 404 route //

app.use((req, res) => {
  res.send("<h1>Bad Url</h1>")
})

// listening server //

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`)
})
