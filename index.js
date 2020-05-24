const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const User = require('./models/UserModel');
const fileUpload = require('express-fileupload');
const newUserController = require('./controllers/newUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const storeUserController = require('./controllers/storeUser');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require('./middleware/validatonMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const expressSession = require('express-session')

const app = new express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware)
app.use(expressSession({
    secret: 'd86j2p412k901scaw'
}))
app.set('view engine', 'ejs');




// HTML ROUTES

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/auth/register', newUserController)

app.get('/auth/login', loginController);

app.post('/posts/store', authMiddleware, storePostController)

app.post('/users/register', storeUserController);

app.post('/users/login', loginUserController);




mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})