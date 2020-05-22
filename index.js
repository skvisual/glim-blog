const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const User = require('./models/UserModel');
const loginController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddlware');
const redirectMiddleware = require('./middleware/redirectMiddleware');

const app = new express();
const PORT = 3000;

const validateMiddleWare = (req,res,next) => {
    if(req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

global.loggedIn = null;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store',validateMiddleWare)
app.use(expressSession({
    secret: 'skvblog'
}))
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
app.set('view engine', 'ejs');




// HTML ROUTES

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    console.log(req.session);
    
    res.render('index', {
        blogposts
    });
    console.log(blogposts)

})

app.get('/about',(req, res) => {
    res.render('about')
})

app.get('/contact',(req, res) => {
    res.render('contact')
})

app.get('/post/:id', async (req,res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', authMiddleware, (req, res)=> {
    if (req.session.userId){
        return res.render('create')
    } else {
        return res.render('/auth/login')
    }
})

app.get('/auth/register', redirectMiddleware, (req, res) => {
    res.render('register', {
        errors: req.session.validationErrors
    })
})

app.get('/auth/login', redirectMiddleware, (req, res) => {
    res.render('login')
})

app.get('/auth/logout', logoutController)

app.post('/posts/store', authMiddleware, (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (err) => {
        await BlogPost.create({
            ...req.body,
            image:'/img/' + image.name
        })
        res.redirect('/')
        })
})

app.post('/users/register', redirectMiddleware, (req, res) => {
    User.create(req.body, (error, user) => {
        if (error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.session.validationErrors = validationErrors
            return res.redirect('/auth/register')
        } else {
            res.redirect('/')
        }
    })
})

app.post('/users/login', redirectMiddleware, loginController);





mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})