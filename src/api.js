import axios from 'axios';

const baseURL = 'http://3.224.49.231:3000' || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
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
export const readTodos = async (userId) => {
  try {
    const response = await apiClient.get('/todos', {
      headers: { 'user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to read todos:", error);
    throw error;
  }
};

// Function to create a new todo
export const createTodo = async (name, userId) => {
  try {
    const response = await apiClient.post('/todos', { name }, {
      headers: { 'user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
};

// Function to mark a todo as done
export const doneTodo = async (id, userId) => {
  try {
    const response = await apiClient.put(`/todos/${id}/done`, {}, {
      headers: { 'user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to mark todo as done:", error);
    throw error;
  }
};

// Function to mark a todo as undone
export const undoneTodo = async (id, userId) => {
  try {
    const response = await apiClient.delete(`/todos/${id}/done`, {
      headers: { 'user-id': userId }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to mark todo as undone:", error);
    throw error;
  }
};