const mongoose = require('mongoose')

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
            type: String,
            required: true,
        },
        created:
        {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;