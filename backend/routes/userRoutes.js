const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    uploadUserAvatar
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin only routes
router.get('/', authorize('admin'), getUsers);
router.post('/', authorize('admin'), createUser);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

// User can upload their own avatar
router.post('/upload-avatar', uploadUserAvatar);

module.exports = router;
