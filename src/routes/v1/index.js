const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const studentRoute = require('./student.route');
const courseRoute = require('./course.route');
const teacherRoute = require('./teacher.route');


const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/students', studentRoute)
router.use('/courses', courseRoute)
router.use('/teachers', teacherRoute)

module.exports = router;
