const { Schema, model } = require("mongoose");

const Todolist = new Schema({
    title: { type: String, required: true}
});

module.exports = model("Todolist", Todolist);
