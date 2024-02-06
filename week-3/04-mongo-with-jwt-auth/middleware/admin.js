const jwt = require("jsonwebtoken")
const jwtpassword = "shhh"

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const words = token.split(" ")
    const jwtToken = words[1]

    try {
        const decodedValue = jwt.verify(jwtToken, jwtpassword)
        if (decodedValue.username) {
            next()
        } else {
            res.status(403).json({ message: "You are not authenticated!" })
        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "Incorrect inputs!"
        })
    }

}

module.exports = adminMiddleware;