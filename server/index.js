const express = require('express');
const app = express()
const port = 3000
const indexRouter = require("./router")

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/", indexRouter)

app.use(express.json()); 