const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');

const app = new express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
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

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})

mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})