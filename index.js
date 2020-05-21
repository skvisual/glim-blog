const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

const app = new express();
const PORT = 3000;

const validateMiddleWare = (req,res,next) => {
    if(req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store',validateMiddleWare)
app.set('view engine', 'ejs');




// HTML ROUTES

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
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

app.get('/posts/new', (req, res)=> {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (err) => {
        await BlogPost.create({
            ...req.body,
            image:'/img/' + image.name
        })
        res.redirect('/')
        })
})


mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})