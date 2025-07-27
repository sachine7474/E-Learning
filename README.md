# ELearn Hub - E-Learning Management System

A full-stack e-learning management system built with Node.js, Express, MongoDB, and React.js.

## Features

### Backend Features
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Student, Instructor, and Admin roles
- **Course Management**: CRUD operations for courses and lessons
- **Enrollment System**: Course enrollment and progress tracking
- **RESTful API**: Well-structured API endpoints
- **Database**: MongoDB with Mongoose ODM

### Frontend Features
- **Responsive Design**: Bootstrap-based responsive UI
- **User Authentication**: Login, register, and profile management
- **Course Browsing**: View and search courses
- **Dashboard**: Personalized user dashboard
- **Role-based Navigation**: Different views for students and instructors
- **Modern React**: Hooks, Context API, and functional components

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Validator.js
- **File Upload**: Multer
- **Environment**: dotenv

### Frontend
- **Framework**: React.js 18
- **Routing**: React Router DOM
- **UI Framework**: React Bootstrap + Bootstrap 5
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Data Fetching**: React Query
- **Notifications**: React Toastify
- **Icons**: Bootstrap Icons

## Project Structure

```
elearning-system/
├── backend/
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── context/      # React contexts
│   │   ├── hooks/        # Custom hooks
│   │   ├── styles/       # CSS files
│   │   ├── App.js        # Main App component
│   │   └── index.js      # Entry point
│   └── package.json      # Frontend dependencies
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy the `.env` file and update the values:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/elearning
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   JWT_EXPIRE=7d
   ```

4. **Start MongoDB**:
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas cloud service

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The server will start on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Course Routes
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (instructor/admin)
- `PUT /api/courses/:id` - Update course (owner/admin)
- `DELETE /api/courses/:id` - Delete course (owner/admin)

### Enrollment Routes
- `POST /api/enrollments/enroll/:courseId` - Enroll in course
- `GET /api/enrollments/my-courses` - Get user's courses
- `GET /api/enrollments/progress/:courseId` - Get course progress

### User Routes (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Usage

### For Students
1. Register/Login to the platform
2. Browse available courses
3. Enroll in courses
4. Track progress in dashboard
5. Access course materials

### For Instructors
1. Register as instructor or admin upgrade
2. Create and manage courses
3. Add lessons and content
4. Monitor student enrollments
5. Upload course materials

### For Admins
1. Full access to all features
2. User management capabilities
3. Course moderation
4. System analytics

## Development Features

### Implemented
- User authentication and authorization
- Course CRUD operations
- Enrollment system
- Role-based access control
- Responsive frontend design
- API documentation structure

### To Be Enhanced (Production Ready)
- File upload functionality for course thumbnails/videos
- Email verification and password reset
- Payment integration for course purchases
- Real-time notifications
- Advanced search and filtering
- Course reviews and ratings
- Discussion forums
- Video streaming capabilities
- Analytics dashboard
- Mobile app development

## Database Schema

### User Model
- Personal information (name, email, bio)
- Authentication (password, role)
- Course relationships (enrolled, created)
- Activity tracking

### Course Model
- Course details (title, description, price)
- Content structure (lessons, resources)
- Metadata (category, level, duration)
- Instructor and student relationships

### Enrollment Model
- Student-course relationship
- Progress tracking
- Completion status
- Reviews and ratings

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based authorization
- Input validation and sanitization
- CORS protection
- Rate limiting capability
- Secure headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository or contact the development team.

---

**Note**: This is a demo/educational project. For production use, additional security measures, testing, and optimizations should be implemented.
