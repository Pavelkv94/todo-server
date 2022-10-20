const express = require('express');
const Task = require('./models/Task');
const Todolist = require('./models/Todolist');
const server = express();
// const Category = require('./models/Categories');
// const User = require('./models/User');
// const roleMiddleware = require('./auth/middleware/roleMiddleware');
// const authMiddleware = require('./auth/middleware/authMiddleware');

// ##Todolists##
server.post('/todo-lists', (req, res) => {
  const { title } = req.body;
  let newTodo = new Todolist();
  newTodo.title = title;
  newTodo.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(data);
  });
});

server.get('/todo-lists', (_req, res) => {
  Todolist.find({}).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data.map(el => ({_id: el._id, title: el.title})));
  });
});

server.put('/todo-lists/:todolistId', (req, res) => {
  Todolist.findByIdAndUpdate(req.params.todolistId, req.body, function (err, data) {
        if (err) {
          return res.status(400).json({ err });
        } else {
          console.log('update success');
          res.json(data);
        }
      });
});

server.delete('/todo-lists/:todolistId', (req, res) => {
  Todolist.deleteOne({ _id: req.params.todolistId }, function (err, data) {
    if (err) {
      return res.status(400).json({ err });
    } else {
      console.log('delete post success');
      res.json(data);
    }
  });
  Task.deleteMany({ todolistId: req.params.todolistId }, function (err, data) {
    if (err) {
      return res.status(400).json({ err });
    } else {
      console.log('delete post success');
      res.json(data);
    }
  });
});

// ##Tasks##

server.get('/todo-lists/:todolistId/tasks', (req, res) => {
  Task.find({todolistId: req.params.todolistId}).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data.map(el => ({_id: el._id, title: el.title, todolistId: el.todolistId, isDone: el.isDone})));
  });
});

server.post('/todo-lists/:todolistId/tasks', (req, res) => {
  const { title } = req.body;
  let newTask = new Task();
  newTask.title = title;
  newTask.todolistId = req.params.todolistId;
  newTask.isDone = false;
  newTask.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(data);
  });
});

server.put('/todo-lists/:todolistId/tasks/:taskId', (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, req.body, function (err, data) {
        if (err) {
          return res.status(400).json({ err });
        } else {
          console.log('update success');
          res.json(data);
        }
      });
});

server.delete('/todo-lists/:todolistId/tasks/:taskId', (req, res) => {
  Task.deleteOne({todolistId: req.params.todolistId, _id: req.params.taskId}).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    res.json(data);
  });
});

module.exports = server;
