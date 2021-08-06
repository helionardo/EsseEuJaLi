const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/EsseEuJaLi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>{
    console.log("Banco conectado")
}).catch( err =>{
    console.log(`${err}`)
})

module.exports = mongoose