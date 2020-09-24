const mongoose = require("mongoose");
const config= require('../config')
const mongoOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};


const mongoHost = process.env.MONGO_HOST || config.MONGO_HOST;

const connectionString = `mongodb://${mongoHost}/todo-app`

if (process.env.NODE_ENV === "test") {
  const Mockgoose = require("mockgoose").Mockgoose;
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(connectionString, mongoOptions);
    
    
  });
} else {
  mongoose.connect(connectionString, mongoOptions);
  mongoose.set('debug', true);
}

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
