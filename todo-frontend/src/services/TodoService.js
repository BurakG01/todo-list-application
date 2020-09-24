import axios from "axios";

const BACK_END_HOST=process.env.REACT_APP_BACK_END_HOST || "localhost";
const BACK_END_PORT=process.env.REACT_APP_BACK_END_PORT || "3001";

const API_URL =  '/todos/';//`http://${BACK_END_HOST}:${BACK_END_PORT}/todos/`;
console.log( "api url", API_URL)

async function createTodo(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task
  });
  return newTodo;
}
async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}
async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload);
  return newTodo;
}
async function getAllTodos() {
  console.log("process",process.env)
  const { data: todos } = await axios.get(API_URL);
  return todos;
}
export default { createTodo, deleteTodo, updateTodo, getAllTodos };
