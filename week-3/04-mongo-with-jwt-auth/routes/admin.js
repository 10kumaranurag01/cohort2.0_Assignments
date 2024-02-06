const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken")
const jwtpassword = "shhh"

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic

    const AdminUsername = req.body.username
    const AdminPass = req.body.password

    const existingAdmin = await Admin.findOne({
        username: AdminUsername,
        password: AdminPass
    })

    if (existingAdmin) {
        res.status(400).json({ msg: "Admin already exists!" })
        return
    }

    await Admin.create({ username: AdminUsername, password: AdminPass })
    res.json({ Message: "Admin created successfully." })
});

router.post('/signin', async (req, res) => {
    // Implement admin signin logic

    const username = req.body.username
    const password = req.body.password

    const admin = await Admin.findOne({
        username: username,
        password: password
    })

    console.log(!admin)

    if (!admin) {
        res.status(411).json({ Message: "Incorrect username or password." })
        return
    } else {
        const token = jwt.sign({ username: username }, jwtpassword)
        res.json({ token })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imageLink = req.body.imageLink

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })

    res.json({
        Message: "Course created successfully!",
        CourseId: course._id
    },
    )
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const courses = await Course.find({})
    res.json({ Courses: courses })
});

module.exports = router;