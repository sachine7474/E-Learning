const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        let query = Course.find();

        // Filtering
        if (req.query.category) {
            query = query.where('category').equals(req.query.category);
        }
        if (req.query.level) {
            query = query.where('level').equals(req.query.level);
        }
        if (req.query.published) {
            query = query.where('isPublished').equals(req.query.published === 'true');
        }

        // Search
        if (req.query.search) {
            query = query.find({
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } }
                ]
            });
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Execute query
        const courses = await query.populate('instructor', 'firstName lastName avatar').exec();
        const total = await Course.countDocuments();

        res.status(200).json({
            success: true,
            count: courses.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: courses
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'firstName lastName avatar bio')
            .populate('enrolledStudents', 'firstName lastName');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (instructor/admin)
exports.createCourse = async (req, res) => {
    try {
        // Add instructor to req.body
        req.body.instructor = req.user.id;

        const course = await Course.create(req.body);

        // Add course to user's created courses
        await User.findByIdAndUpdate(req.user.id, {
            $push: { createdCourses: course._id }
        });

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Course creation failed'
        });
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (course owner/admin)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Course update failed'
        });
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (course owner/admin)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        await course.deleteOne();

        // Remove course from instructor's created courses
        await User.findByIdAndUpdate(course.instructor, {
            $pull: { createdCourses: course._id }
        });

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Add lesson to course
// @route   POST /api/courses/:id/lessons
// @access  Private (course owner/admin)
exports.addLesson = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Set lesson order
        req.body.order = course.lessons.length + 1;

        course.lessons.push(req.body);
        await course.save();

        res.status(201).json({
            success: true,
            data: course.lessons[course.lessons.length - 1]
        });
    } catch (error) {
        console.error('Add lesson error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to add lesson'
        });
    }
};

// @desc    Update lesson
// @route   PUT /api/courses/:id/lessons/:lessonId
// @access  Private (course owner/admin)
exports.updateLesson = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const lesson = course.lessons.id(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Update lesson fields
        Object.keys(req.body).forEach(key => {
            lesson[key] = req.body[key];
        });

        await course.save();

        res.status(200).json({
            success: true,
            data: lesson
        });
    } catch (error) {
        console.error('Update lesson error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update lesson'
        });
    }
};

// @desc    Delete lesson
// @route   DELETE /api/courses/:id/lessons/:lessonId
// @access  Private (course owner/admin)
exports.deleteLesson = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        course.lessons.pull({ _id: req.params.lessonId });
        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lesson deleted successfully'
        });
    } catch (error) {
        console.error('Delete lesson error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get course lessons
// @route   GET /api/courses/:id/lessons
// @access  Public
exports.getCourseLessons = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).select('lessons title');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course.lessons.sort((a, b) => a.order - b.order)
        });
    } catch (error) {
        console.error('Get course lessons error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Upload course thumbnail
// @route   POST /api/courses/:id/upload-thumbnail
// @access  Private (course owner/admin)
exports.uploadCourseThumbnail = async (req, res) => {
    try {
        // This is a simplified version - in real app, handle file upload
        res.status(200).json({
            success: true,
            message: 'File upload functionality not implemented in this demo'
        });
    } catch (error) {
        console.error('Upload thumbnail error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
