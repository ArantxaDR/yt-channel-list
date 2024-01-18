const express = require('express');//helps to set up the server
const mongoose = require('mongoose');//makes easy to conect to mongoDB ans create schemas
const cors = require('cors');//minimize any errors
const bodyParser = require('body-parser');//helps parse data into json
const bcrypt = require('bcrypt');//hide password to secure it
const jwt = require('jsonwebtoken');//follows the user as soon as it's created with a token

const User = require('./models/userSchema');
const secretKey = '6d0fa5b3-9770-4489-8e78-84943eded6e4';

//connect to express app
const app = express();
const port = process.env.PORT || 3001;
//connect to mongoDB
mongoose.connect('mongodb+srv://arantxaderuiz:8MIT8fUTGFEgqGLY@cluster01.jqkgedk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port)
    console.log(`Server conected to port ${port} and mongoDB`)
  })
  .catch((error) => {
    console.log(error, 'Unable to conect to server or mongoDB');
  });


//Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu aplicación cliente
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

//Routes
//User registration - POST register
app.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashPassword })
    //conn.collection < User > ('users').insertOne(newUser);
    console.log({ username });
    console.log({ newUser });
    newUser.save();
    res.status(201).json({ message: 'User created sucessfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
});

//Get registered users
app.get('/register', async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' });
  }
});

//GET login
app.post('/login', async (req, res) => {

  try {
    const { username, password } = req.body

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'User or password are incorrect' });
    }
    const isPasswordValid = (await bcrypt.compare(password, user.password)).valueOf();

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'User or password are incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1hr' });

    res.json({ token: { token }, message: 'Login successfull' });
  } catch (error) {
    console.log('error :', error);
    res.status(500).json({ error: 'Error logging in' })
  }
})
