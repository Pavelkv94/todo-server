const { Schema, model } = require("mongoose");

const Task = new Schema({
    title: { type: String, required: true },
    todolistId: { type: String, required: true },
    isDone: { type: Boolean }
});

module.exports = model("Task", Task);
