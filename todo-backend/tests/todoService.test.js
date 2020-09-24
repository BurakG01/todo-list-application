process.env.NODE_ENV = "test";
const assert = require("assert");
const todoService = require("../services/todoService");
const db = require("../models");

describe(" unit hooks", function () {
  afterEach(async function () {
    await db.Todo.collection.deleteMany({});
  });

  describe("Create Todo", () => {
    it("todo should be created", async () => {
      const newTodo = {
        task: "newTodo",
      };
      const todo = await todoService.createTodo(newTodo);
      const createdTodo = await db.Todo.findById(todo._id);

      assert.strictEqual(todo.task, createdTodo.task);
    });

    // todo : test dublicate exception
  });

  describe("Update Todo", () => {
    it("todo should be updated", async () => {
      const newTodo = {
        task: "newTodo",
      };
      const update = {
        completed: true,
      };
      const todo = await db.Todo.create(newTodo); // insert into in memory

      const updatedTodo = await todoService.updateTodo(todo._id, update);

      assert.strictEqual(updatedTodo.completed, update.completed);
    });
  });

  describe("Delete Todo", () => {
    it("todo should be deleted", async () => {
      const newTodo = {
        task: "newone",
      };

      const todo = await db.Todo.create(newTodo);

      await todoService.deleteTodo(todo._id);

      const isExist = await db.Todo.exists({ _id: todo._id });

      assert.strictEqual(false, isExist);
    });
  });

  describe("Get Todos", () => {
    it("getTodos should return all todos", async () => {
      const count = 5;

      for (var i = 0; i < count; i++) {
        let newTodo = {
          task: `newone${i}`,
        };
        await db.Todo.create(newTodo);
      }

      const todos = await todoService.getTodos();

      assert.strictEqual(todos.length, count);
    });
  });
});
