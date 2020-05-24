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
const logoutUserController = require('./controllers/logout');
const storeUserController = require('./controllers/storeUser');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require('./middleware/validatonMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectMiddleware = require('./middleware/redirectMiddleware');
const expressSession = require('express-session');
const flash = require('connect-flash');

const app = new express();
const PORT = 3000;

global.loggedIn = null;


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware)
app.use(expressSession({
    secret: 'd86j2p412k901scaw'
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
// app.use(flash());
app.set('view engine', 'ejs');




// HTML ROUTES

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/auth/register', redirectMiddleware, newUserController)

app.get('/auth/login', redirectMiddleware, loginController);

app.get('/auth/logout', logoutUserController);

app.post('/posts/store', authMiddleware, storePostController)

app.post('/users/register',redirectMiddleware, storeUserController);

app.post('/users/login', redirectMiddleware, loginUserController);





mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})