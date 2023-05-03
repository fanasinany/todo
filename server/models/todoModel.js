const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        status:
        {
            type: String,
            required: true,
            default: "todo"
        },
        assigned:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        created:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;