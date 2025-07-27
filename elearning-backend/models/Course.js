const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Lesson title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Lesson content is required']
    },
    videoUrl: {
        type: String
    },
    duration: {
        type: Number, // in minutes
        default: 0
    },
    order: {
        type: Number,
        required: true
    },
    resources: [{
        name: String,
        url: String,
        type: {
            type: String,
            enum: ['pdf', 'video', 'link', 'document']
        }
    }]
}, {
    timestamps: true
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxlength: [100, 'Course title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['Programming', 'Design', 'Business', 'Marketing', 'Music', 'Photography', 'Other']
    },
    level: {
        type: String,
        required: true,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: 0
    },
    thumbnail: {
        type: String,
        default: 'default-course.jpg'
    },
    lessons: [lessonSchema],
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    requirements: [String],
    whatYouWillLearn: [String],
    tags: [String],
    isPublished: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    totalDuration: {
        type: Number, // in minutes
        default: 0
    }
}, {
    timestamps: true
});

// Calculate total duration before saving
courseSchema.pre('save', function(next) {
    if (this.lessons && this.lessons.length > 0) {
        this.totalDuration = this.lessons.reduce((total, lesson) => {
            return total + (lesson.duration || 0);
        }, 0);
    }
    next();
});

// Virtual for enrollment count
courseSchema.virtual('enrollmentCount').get(function() {
    return this.enrolledStudents ? this.enrolledStudents.length : 0;
});

module.exports = mongoose.model('Course', courseSchema);
