import axios from "axios";

const baseURL = 'http://3.224.49.231:3000' || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const readTodos = async () => {
  try {
    let res = await apiClient.get('/todos');
    return res.data;
  } catch (error) {
    console.error("Failed to read todos:", error);
    throw error;
  }
}

const createTodo = async (name) => {
  try {
    let res = await apiClient.post('/todos', { name });
    return res.data;
  } catch (error) {
    console.error("Failed to create todo:", error);
    throw error;
  }
}

const doneTodo = async (id) => {
  try {
    let res = await apiClient.put(`/todos/${id}/done`);
    return res.data;
  } catch (error) {
    console.error("Failed to mark todo as done:", error);
    throw error;
  }
}

const undoneTodo = async (id) => {
  try {
    let res = await apiClient.delete(`/todos/${id}/done`);
    return res.data;
  } catch (error) {
    console.error("Failed to mark todo as undone:", error);
    throw error;
  }
}

export {
  readTodos,
  createTodo,
  doneTodo,
  undoneTodo
}
