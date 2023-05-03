const mongoose = require('mongoose')
const User = require('./userModel');

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        status:
        {
            type: String,
            required: true,
            default: "todo"
        },
        assigned:
        {
            type: User,
            required: true,
        },
        created:
        {
            type: User,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;