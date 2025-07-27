const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    jwtExpire: process.env.JWT_EXPIRE || '7d',
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: process.env.RATE_LIMIT_MAX || 100
    }
};