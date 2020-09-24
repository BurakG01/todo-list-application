process.env.NODE_ENV = "test";

const db = require("../models");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { assert } = require("chai");
let should = chai.should();
chai.use(chaiHttp);

describe(" api hooks", () => {
  before(async () => {
    for (var i = 0; i < 5; i++) {
      let newTodo = {
        task: `newone${i}`,
      };
      await db.Todo.create(newTodo);
    }
  });

  describe("/GET todos", () => {
    it("it should return all the todos", (done) => {
      chai
        .request(server)
        .get("/todos")
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.be.a("array");
          res.body.length.should.be.eql(5);
          done();
        });
    });
  });

  describe("/Post todo", () => {
    it("it should return created todo", (done) => {
      chai
        .request(server)
        .post("/todos")
        .send({ task: "blabla" })
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("task");
          res.body.should.have.property("completed");
          done();
        });
    });

    it("it should return bad request when task already exist ", (done) => {
      chai
        .request(server)
        .post("/todos")
        .send({ task: "newone0" })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  describe("/Update todo", () => {
    it("it should return updated todo", (done) => {
      db.Todo.findOne({ task: "newone0" }, function callback(
        error,
        todo,
        unit
      ) {
        chai
          .request(server)
          .put(`/todos/${todo._id}`)
          .send({ completed: true })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id");
            res.body.should.have.property("task");
            res.body.should.have.property("completed");

            done();
          });
      });
    });
  });

  describe("/Delete todo", () => {
    it("it should return updated todo", (done) => {
      db.Todo.findOne({ task: "newone0" }, function callback(
        error,
        todo,
        unit
      ) {
        chai
          .request(server)
          .delete(`/todos/${todo._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
