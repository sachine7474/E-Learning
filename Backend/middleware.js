const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'User account is deactivated.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// Authorize specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: Role ${req.user.role} is not authorized to access this route
            });
        }
        next();
    };
};

// Check if user is course instructor or admin
exports.courseOwnership = async (req, res, next) => {
    try {
        const Course = require('../models/Course');
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Convert to string for comparison
        const instructorId = course.instructor.toString();
        const userId = req.user._id.toString();
        
        // Allow if user is admin or course instructor
        if (req.user.role === 'admin' || instructorId === userId) {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to modify this course'
            });
        }
    } catch (error) {
        console.error('Course ownership middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};