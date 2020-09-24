import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func,
    deleteTodo: PropTypes.func.isRequired,
  };
  render() {
  
    return (
      <ListGroup>
        { this.props.todos.map(({ _id, task, completed }, i) => (
          <ListGroup.Item
            className="todoList"
            style={{ outline: "none" }}
            key={i}
            variant={completed ? "dark" : ""}
            action
            onClick={(e) =>  this.props.updateTodo(e, _id)}
          >
            {task}

            <FontAwesomeIcon
              style={{ float: "right" }}
              onClick={(e) =>  this.props.deleteTodo(e, _id)}
              icon={faTrash}
            />
            {completed ? (
              <FontAwesomeIcon style={{ float: "right" }} icon={faCheck} />
            ) : null}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
