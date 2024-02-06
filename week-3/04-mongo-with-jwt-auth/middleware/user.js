const jwt = require("jsonwebtoken")
const jwtpassword = "shhh"

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken, jwtpassword)

    if (decodedValue.username) {
        console.log(decodedValue.username)
        req.username = decodedValue.username
        next()
    } else {
        res.status(403).json({ message: "You are not authenticated!" })
    }

}

module.exports = userMiddleware;