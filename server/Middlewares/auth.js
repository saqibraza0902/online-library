const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) {
            return res.status(400).json({ messsage: "Invalid Authentication" });
        }
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Authentication token" });
            }
            req.user = user
            next()
        })

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
module.exports = auth