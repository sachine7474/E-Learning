const express = require('express');
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    addLesson,
    updateLesson,
    deleteLesson,
    getCourseLessons,
    uploadCourseThumbnail
} = require('../controllers/courseController');
const { protect, authorize, courseOwnership } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);
router.get('/:id/lessons', getCourseLessons);

// Protected routes - Instructor/Admin only for course management
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, courseOwnership, updateCourse);
router.delete('/:id', protect, courseOwnership, deleteCourse);
router.post('/:id/upload-thumbnail', protect, courseOwnership, uploadCourseThumbnail);

// Lesson management
router.post('/:id/lessons', protect, courseOwnership, addLesson);
router.put('/:id/lessons/:lessonId', protect, courseOwnership, updateLesson);
router.delete('/:id/lessons/:lessonId', protect, courseOwnership, deleteLesson);

module.exports = router;
