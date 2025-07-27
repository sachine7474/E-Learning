const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (admin)
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        let query = User.find().select('-password');

        // Filtering
        if (req.query.role) {
            query = query.where('role').equals(req.query.role);
        }
        if (req.query.isActive !== undefined) {
            query = query.where('isActive').equals(req.query.isActive === 'true');
        }

        // Search
        if (req.query.search) {
            query = query.find({
                $or: [
                    { firstName: { $regex: req.query.search, $options: 'i' } },
                    { lastName: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } }
                ]
            });
        }

        const users = await query.skip(skip).limit(limit).exec();
        const total = await User.countDocuments();

        res.status(200).json({
            success: true,
            count: users.length,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            },
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (admin)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('enrolledCourses', 'title thumbnail')
            .populate('createdCourses', 'title thumbnail');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Create user
// @route   POST /api/users
// @access  Private (admin)
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'User creation failed'
        });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (admin)
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'User update failed'
        });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Upload user avatar
// @route   POST /api/users/upload-avatar
// @access  Private
exports.uploadUserAvatar = async (req, res) => {
    try {
        // This is a simplified version - in real app, handle file upload
        res.status(200).json({
            success: true,
            message: 'Avatar upload functionality not implemented in this demo'
        });
    } catch (error) {
        console.error('Upload avatar error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
