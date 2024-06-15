import axios from "axios";

const baseURL = process.env.VUE_APP_API_URL || 'http://54.158.36.98:3000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to each request if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Function to handle registration
export const registerUser = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Function to handle login
export const loginUser = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Function to read todos
export const readTodos = async () => {
  try {
    const response = await apiClient.get('/todos');
    return response.data;
  } catch (error) {
    console.error("Failed to read todos:", error);
    throw error;
  }
};

// Function to create a new todo
export const createTodo = async (name) => {
  try {
    const response = await apiClient.post('/todos', { name });
    return response.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
};

// Function to mark a todo as done
export const doneTodo = async (id) => {
  try {
    const response = await apiClient.put(`/todos/${id}/done`);
    return response.data;
  } catch (error) {
    console.error("Failed to mark todo as done:", error);
    throw error;
  }
};

// Function to mark a todo as undone
export const undoneTodo = async (id) => {
  try {
    const response = await apiClient.delete(`/todos/${id}/done`);
    return response.data;
  } catch (error) {
    console.error("Failed to mark todo as undone:", error);
    throw error;
  }
};