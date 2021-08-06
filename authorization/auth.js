const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        res.status(401).json("Não autorizado");
    } else {
        token = token.split(" ");
        jwt.verify(token[1], "r7yy128312fvjuewf", async (err, decoded) => {
            if (err) return res.status(401).json("Não autorizado");

            let user = await User.findById(decoded.id);

            if (!user) return res.status(401).json("Não autorizado");

            req.decoded = decoded;
            next();
        });
    }
};