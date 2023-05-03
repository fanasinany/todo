const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Todo = require('./models/todoModel')
const User = require('./models/userModel')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/*============ Todos API ==============*/

//Get todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Create todo
app.post('/todos', async (req, res) => {
    try {
        const todos = await Todo.create(req.body)
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        if (!todo) {
            return res.status(404).json({ message: `cannot find any todo with ID ${id}` })
        }
        const updatedTodo = await Todo.findById(id)
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id)
        if (!todo) {
            return res.status(404).json({ message: `cannot find any todo with ID ${id}` })
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/*============ User API ==============*/
//Get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Register
app.post('/register', (req, res) => {
    try {
        bcrypt
            .hash(req.body.password, 10)
            .then(async (hashedPassword) => {
                req.body.password = hashedPassword
                const users = await User.create(req.body)
                res.status(200).json(users)
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Password was not hashed successfully",
                    error,
                });
            })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb://127.0.0.1:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to mongoDB!')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })