const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completedLessons: [{
        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isCompleted: {
        type: Boolean,
        default: false
    },
    completionDate: {
        type: Date
    },
    lastAccessedLesson: {
        type: mongoose.Schema.Types.ObjectId
    },
    lastAccessDate: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        maxlength: [500, 'Review cannot exceed 500 characters']
    }
}, {
    timestamps: true
});

// Compound index to ensure one enrollment per student per course
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

// Update progress based on completed lessons
enrollmentSchema.methods.updateProgress = function() {
    if (this.completedLessons && this.completedLessons.length > 0) {
        // This would need to be calculated based on total lessons in the course
        // For now, we'll keep it simple
        this.progress = Math.min(100, (this.completedLessons.length / 10) * 100);
        
        if (this.progress >= 100) {
            this.isCompleted = true;
            this.completionDate = new Date();
        }
    }
};

module.exports = mongoose.model('Enrollment', enrollmentSchema);
