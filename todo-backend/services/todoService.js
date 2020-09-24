const db = require("../models");

module.exports = {
  getTodos: async () => {
    return await db.Todo.find({});
  },
  createTodo: async (todo) => {
    return await db.Todo.create(todo);
  },
  updateTodo: async (id, update) => {
    return await db.Todo.findByIdAndUpdate(id, update, {
      new: true,
    });
  },
  deleteTodo: async (id) => {
    await db.Todo.findByIdAndRemove(id);
  },
};
