const http = require("http")
const fs = require("fs")
const PORT = process.env.local || 3000
const hostname = "localhost"

const server = http.createServer((req, res) => {
  const handleReadFile = (statusCode, fileLocation) => {
    fs.readFile(fileLocation, (err, data) => {
      res.writeHead(statusCode, { "Content-Type": "text/html" })
      res.write(data)
      res.end()
    })
  }

  if (req.url === "/") {
    handleReadFile(200, "index.html")
  } else if (req.url === "/about") {
    handleReadFile(200, "about.html")
  } else if (req.url === "/contact") {
    handleReadFile(200, "contact.html")
  } else {
    handleReadFile(404, "err.html")
  }
})

server.listen(PORT, hostname, () => {
  console.log(`Server is running at http://${hostname}:${PORT}`)
})
