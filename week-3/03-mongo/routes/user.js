const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

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
    res.json({ Msg: "User created successfully." })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic

    try {
        const courses = await Course.find({}).exec()
        res.json({ Courses: courses })
    } catch (e) {
        console.log(e)
        res.status(500).json({ Message: "Unable to get courses" })
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const username = req.headers.username
    const courseID = req.params.courseId

    await User.updateOne({ username: username }, {
        "$push": {
            purchasedCourses: courseID
        }
    })

    res.json({ message: "Purchase Complete!" })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.headers.username

    const user = await User.findOne({ username: username })
    console.log(user.purchasedCourses)

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })

    res.json({
        Courses: courses
    })
});

module.exports = router