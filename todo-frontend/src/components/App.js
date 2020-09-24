import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoService from "../services/TodoService";
import { ToastContainer, toast } from "react-toastify";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  state = {
    todo: "",
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }
  getTodos = async () => {
    const todos = await TodoService.getAllTodos();
    this.setState({ todos: todos });
  };
  createTodo = async (e) => {
    const { todos, todo } = this.state;

    e.preventDefault();
    if (!todo) {
      this.notify("Please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      this.notify(`Task: ${todo} already exists`);
      return;
    }

    const newTodo = await TodoService.createTodo(todo);

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }))

   // this.setState([...todos, newTodo]);
  };
  deleteTodo = async (e, id) => {
    const { todos } = this.state;
    try {
      e.stopPropagation();
      await TodoService.deleteTodo(id);
      this.setState({ todos: todos.filter(({ _id: i }) => id !== i) });
    } catch (err) {}
  };

  updateTodo = async (e, id) => {
    const { todos } = this.state;
    e.stopPropagation();
    const payload = {
      completed: !todos.find((todo) => todo._id === id).completed,
    };
    const updatedTodo = await TodoService.updateTodo(id, payload);
    this.setState({
      todos: todos.map((todo) => (todo._id === id ? updatedTodo : todo)),
    });
  };

  notify = (message) => {
    toast(message, {
      type: "error",
      autoDismiss: true,
      position: "top-right",
      closeButton: false,
      autoClose: 2000,
    });
  };

  setTodo = (value) => {
    this.setState({ todo: value });
  };

  render() {
    return (
      <Container data-testid="loading">
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <TodoForm setTodo={this.setTodo} createTodo={this.createTodo} />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <TodoList
              todos={this.state.todos}
              deleteTodo={this.deleteTodo}
              updateTodo={this.updateTodo}
            />
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    );
  }
}
