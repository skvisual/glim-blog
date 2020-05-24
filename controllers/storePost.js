const BlogPost = require('../models/BlogPost');
const Path = require('path');

module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(Path.resolve(__dirname,'..','public/img',image.name), async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
    })
}