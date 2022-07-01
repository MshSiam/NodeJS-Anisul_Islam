const express = require("express")
const app = express()
const PORT = 3000

// =======Middlewere==========
const myMiddleWere = (req, res, next) => {
  console.log("I am MiddleWere")

  req.currentTime = new Date(Date.now())
  next()
}
app.use(myMiddleWere)

// error handling middlewere
app.use((req, res, next) => {
  res.send("<h1>404. Bad Url.</h1>")
})

// get & post are APPLICATION LEVEL MIDDLEWERE

app.get("/", (req, res) => {
  console.log("I am Home" + req.currentTime)
  res.send("Home Route")
})
app.get("/about", (req, res) => {
  console.log("I am about" + req.currentTime)
  res.send("Home Route")
})

// Router .methode are router level middlewere//

// =-============listening ============
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`)
})

// express.methode are built in middlewere.
//  body parser , coockies parser are 3rd party middlewere.
