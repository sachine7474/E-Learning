const express = require('express');
const {
    enrollInCourse,
    getMyEnrollments,
    getEnrollmentProgress,
    markLessonComplete,
    unenrollFromCourse,
    addCourseReview
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Student enrollment routes
router.post('/enroll/:courseId', enrollInCourse);
router.get('/my-courses', getMyEnrollments);
router.get('/progress/:courseId', getEnrollmentProgress);
router.post('/complete-lesson/:courseId/:lessonId', markLessonComplete);
router.delete('/unenroll/:courseId', unenrollFromCourse);
router.post('/review/:courseId', addCourseReview);

module.exports = router;
