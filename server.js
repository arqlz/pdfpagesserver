var express = require("express")
const app = express()

app.use("/", require("./index").router)


app.listen(8000, () => {
    console.log("server online on port 8000")
})