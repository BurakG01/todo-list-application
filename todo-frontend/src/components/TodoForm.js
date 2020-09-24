
import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import PropTypes from 'prop-types'
export default class TodoForm extends React.Component {

    static propTypes = {
        setTodo: PropTypes.func,
        createTodo: PropTypes.func.isRequired
    }

    render(){
        return (
            <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={this.props.todo}
              onChange={({ target }) => this.props.setTodo(target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="dark" size="lg" onClick={this.props.createTodo}>
                ADD
              </Button>
            </InputGroup.Append>
          </InputGroup>
        )
    }
}
