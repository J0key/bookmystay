const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.headers("Authorization")?.split("")[1];
    if (!token) return res.status(401).json({ message: "No Token" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (err) {
        res.status(401).json * { message: "Invalid Token" }
    }

}