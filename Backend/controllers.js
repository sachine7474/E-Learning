const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const crypto = require('crypto');

// @desc    Enroll in a course
// @route   POST /api/enrollments/enroll/:courseId
// @access  Private
exports.enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (!course.isPublished) {
            return res.status(400).json({
                success: false,
                message: 'Cannot enroll in unpublished course'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: req.params.courseId
        });

        // Add student to course's enrolled students
        await Course.findByIdAndUpdate(req.params.courseId, {
            $push: { enrolledStudents: req.user.id }
        });

        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(req.user.id, {
            $push: { enrolledCourses: req.params.courseId }
        });

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        console.error('Enroll in course error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Enrollment failed'
        });
    }
};

// @desc    Get user's enrollments
// @route   GET /api/enrollments/my-courses
// @access  Private
exports.getMyEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user.id })
            .populate('course', 'title description thumbnail instructor totalDuration')
            .populate('course.instructor', 'firstName lastName')
            .sort('-enrollmentDate');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        console.error('Get my enrollments error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get enrollment progress for a course
// @route   GET /api/enrollments/progress/:courseId
// @access  Private
exports.getEnrollmentProgress = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        }).populate('course', 'title lessons');

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        console.error('Get enrollment progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Mark lesson as complete
// @route   POST /api/enrollments/complete-lesson/:courseId/:lessonId
// @access  Private
exports.markLessonComplete = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Check if lesson is already completed
        const alreadyCompleted = enrollment.completedLessons.some(
            lesson => lesson.lesson.toString() === req.params.lessonId
        );

        if (alreadyCompleted) {
            return res.status(400).json({
                success: false,
                message: 'Lesson already completed'
            });
        }

        // Add completed lesson
        enrollment.completedLessons.push({
            lesson: req.params.lessonId,
            completedAt: new Date()
        });

        enrollment.lastAccessedLesson = req.params.lessonId;
        enrollment.lastAccessDate = new Date();

        // Get total lessons for progress calculation
        const course = await Course.findById(req.params.courseId);
        const totalLessons = course.lessons.length;
        
        // Update progress
        enrollment.updateProgress(totalLessons);

        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        console.error('Mark lesson complete error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Unenroll from course
// @route   DELETE /api/enrollments/unenroll/:courseId
// @access  Private
exports.unenrollFromCourse = async (req, res) => {
    try {
        // Remove enrollment
        await Enrollment.deleteMany({ 
            course: req.params.courseId,
            student: req.user.id 
        });

        // Remove student from course's enrolled students
        await Course.findByIdAndUpdate(req.params.courseId, {
            $pull: { enrolledStudents: req.user.id }
        });

        // Remove course from user's enrolled courses
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { enrolledCourses: req.params.courseId }
        });

        res.status(200).json({
            success: true,
            message: 'Successfully unenrolled from course'
        });
    } catch (error) {
        console.error('Unenroll from course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Add course review
// @route   POST /api/enrollments/review/:courseId
// @access  Private
exports.addCourseReview = async (req, res) => {
    try {
        const { rating, review } = req.body;

        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Must be enrolled to review this course'
            });
        }

        // Update enrollment with review
        enrollment.rating = rating;
        enrollment.review = review;
        await enrollment.save();

        // Update course rating (simplified calculation)
        const allRatings = await Enrollment.find({
            course: req.params.courseId,
            rating: { $exists: true }
        }).select('rating');

        if (allRatings.length > 0) {
            const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;
            await Course.findByIdAndUpdate(req.params.courseId, {
                rating: avgRating,
                numReviews: allRatings.length
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        console.error('Add course review error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Review submission failed'
        });
    }
};