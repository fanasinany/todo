const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("./auth");
const Todo = require('./models/todoModel')
const User = require('./models/userModel')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

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


//get todos by user assigned
app.get('/todos-assigned/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.find({ assigned: id })
            .populate('created', 'name')
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//get todos by user created
app.get('/todos-created/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.find({ created: id })
            .populate('assigned', 'name')
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Create todo
app.post('/todos', auth, async (req, res) => {
    try {
        const todos = await Todo.create(req.body)
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update todo
app.put('/todos/:id', auth, async (req, res) => {
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
app.delete('/todos/:id', auth, async (req, res) => {
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
//Get users (name and id)
app.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({}, { id: 1, name: 1 })
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
                res.status(500).json({ message: "Can't hash password", error });
            })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Login
app.post("/login", (req, res) => {
    // check if email exists
    User.findOne({ email: req.body.email })
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt.compare(req.body.password, user.password)
                // if the passwords match
                .then((passwordCheck) => {
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).json({
                            message: "Passwords does not match",
                            error,
                        });
                    }
                    // create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                            userName: user.name,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    // return success response
                    res.status(200).json({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password does not match
                .catch((error) => {
                    res.status(400).json({
                        message: "Passwords does not match",
                        error,
                    });
                })
        })
        // catch error if email does not exist
        .catch((error) => {
            res.status(404).json({ message: "Email not found", error })
        })
})

//verify Token
app.get("/verifyToken", async (req, res) => {
    try {
        const decodedToken = await jwt.verify(req.headers["authorization"], "RANDOM-TOKEN");

        await User.findById(decodedToken.userId)
            .then(() => {
                res.json({ status: true, email: decodedToken.userEmail, id: decodedToken.userId, name: decodedToken.userName });
            })
            .catch(() => {
                res.json({ status: false });
            })
    } catch (error) {
        res.json({ status: false });
    }
});


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