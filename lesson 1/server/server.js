const http = require("http")
const port = process.env.local || 3000

const server = http.createServer((req, res) => {
  res.writeHead(202, { "Content-Type": "text/html" })
  res.write("<h1>Hi</h1>")
  res.end()
})

server.listen(port, () => {
  console.log("running in", port)
})
