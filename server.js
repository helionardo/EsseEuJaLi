const express = require("express")

const app = express()

//DATABASE
require('./database/mongoose')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ROUTES
app.use('/api/user', require('./routes/user'))

app.listen(3000, (err) => {
    if (err) console.log(err)
    console.log("Servidor rodando na porta 3000")
})