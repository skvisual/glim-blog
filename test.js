const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/blog_db', {useNewUrlParser: true});

BlogPost.findByIdAndDelete('5ec6965f9a040e1ff81b101b', (err, blogpost) => {
    console.log(err, blogpost)
})

BlogPost.findByIdAndDelete('5ec69798cfb589230c686582', (err, blogpost) => {
    console.log(err, blogpost)
})

BlogPost.findByIdAndDelete('5ec69c0edf66c13270536c45', (err, blogpost) => {
    console.log(err, blogpost)
})
