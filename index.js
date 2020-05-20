const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = new express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

// HTML ROUTES

app.get('/',(req, res) => {
    res.render('index')
})

app.get('/about',(req, res) => {
    res.render('about')
})

app.get('/contact',(req, res) => {
    res.render('contact')
})

app.get('/post',(req, res) => {
    res.render('post')
})


mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})