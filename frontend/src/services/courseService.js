import axios from 'axios';

const API_URL = '/api/courses';

// Create axios instance
const courseAPI = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
courseAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
courseAPI.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const courseService = {
  // Get all courses with filters
  getCourses: async (params = {}) => {
    const response = await courseAPI.get('/', { params });
    return response;
  },

  // Get single course
  getCourse: async (id) => {
    const response = await courseAPI.get(`/${id}`);
    return response;
  },

  // Create new course
  createCourse: async (courseData) => {
    const response = await courseAPI.post('/', courseData);
    return response;
  },

  // Update course
  updateCourse: async (id, courseData) => {
    const response = await courseAPI.put(`/${id}`, courseData);
    return response;
  },

  // Delete course
  deleteCourse: async (id) => {
    const response = await courseAPI.delete(`/${id}`);
    return response;
  },

  // Get course lessons
  getCourseLessons: async (courseId) => {
    const response = await courseAPI.get(`/${courseId}/lessons`);
    return response;
  },

  // Add lesson to course
  addLesson: async (courseId, lessonData) => {
    const response = await courseAPI.post(`/${courseId}/lessons`, lessonData);
    return response;
  },

  // Update lesson
  updateLesson: async (courseId, lessonId, lessonData) => {
    const response = await courseAPI.put(`/${courseId}/lessons/${lessonId}`, lessonData);
    return response;
  },

  // Delete lesson
  deleteLesson: async (courseId, lessonId) => {
    const response = await courseAPI.delete(`/${courseId}/lessons/${lessonId}`);
    return response;
  },
};

export default courseService;
