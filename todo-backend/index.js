const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const todoService = require("./services/todoService");
const PORT = process.env.PORT || 3001;
console.log("env",process.env.PORT)




app.use(bodyParser.json());
app.use(cors());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await todoService.getTodos();
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body);
    return success(res, todo);

  } catch (err) {
    next({
      status: 400,
      message:
        err.code == 11000 ? "task already exist" : "failed to create todo",
    });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});



app.delete("/todos/:id", async (req, res, next) => {
  try {
    await todoService.deleteTodo(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app; // for testing
