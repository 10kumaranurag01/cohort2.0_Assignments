const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

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
    res.json({ Msg: "Admin created successfully." })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const courseTitle = req.body.title
    const courseDescription = req.body.description
    const CoursePrice = req.body.price
    const CourseImageLink = req.body.imageLink


    const existingCourse = await Course.findOne({
        title: courseTitle,
        description: courseDescription
    })

    if (existingCourse) {
        res.status(400).json({ Message: "Course already exists!" })
        return
    }

    const newCourse = await Course.create({ title: courseTitle, description: courseDescription, price: CoursePrice, imageLink: CourseImageLink })
    res.json({
        Message: "Course successfully create!",
        CourseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({})
        res.json({ Courses: courses })
    } catch (e) {
        console.log(e)
        res.status(500).json({ Message: "Unable to get courses" })
    }
});

module.exports = router;