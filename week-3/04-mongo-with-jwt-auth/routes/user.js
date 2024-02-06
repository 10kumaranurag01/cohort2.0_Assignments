const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken")
const jwtpassword = "shhh"


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const userUsername = req.body.username
    const userPass = req.body.password

    const existingUser = await User.findOne({
        username: userUsername,
        password: userPass
    })

    if (existingUser) {
        res.status(400).json({ msg: "User already exists!" })
        return
    }

    await User.create({ username: userUsername, password: userPass })
    res.json({ Messaeg: "User created successfully." })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username: username, password: password })

    if (!user) {
        res.status(411).json({ Message: "Incorrect username or password!" })
        return
    } else {
        const token = jwt.sign({ username: username }, jwtpassword)
        res.json({
            token
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    const courses = await Course.find({})
    res.json({ Courses: courses })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const username = req.username
    const courseId = req.params.courseId

    await User.updateOne({ username: username }, {
        "$push": {
            purchasedCourses: courseId
        }
    })

    res.json({ Message: "Purchase complete!" })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.username

    const user = await User.findOne({ username: username })
    console.log(user.purchasedCourses)

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses

        }
    })

    res.json({ courses })
});

module.exports = router