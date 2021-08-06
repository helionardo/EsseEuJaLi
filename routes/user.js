const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/User');
const isAuthenticated = require('../authorization/auth')

router.post('/login', async (req, res) => {
    try {
        let { email, senha } = req.body

        const user = await User.findOne({ email });

        if (!user || !bcrypt.compareSync(senha, user.senha)) {
            return res.status(400).json("Credenciais incorretas")
        }

        const token = jwt.sign({ id: user._id, nome: user.nome, email: user.email }, "r7yy128312fvjuewf", {
            expiresIn: '7d'
        })

        return res.json(token)

    } catch (error) {
        return res.status(500).json("Erro interno")
    }
});


router.post('/register', async (req, res) => {
    try {
        let { nome, email, senha } = req.body

        const newUser = new User({
            nome, email, senha: bcrypt.hashSync(senha, bcrypt.genSaltSync(10))
        })

        await newUser.save()
        return res.json("Usuário cadastrado com sucesso")

    } catch (err) {
        console.log(err)
        return res.status(500).json("Erro interno")
    }
})

router.get("/isAuth", isAuthenticated, async (req, res) => {
    return res.json("Ta autenticado")
})


module.exports = router