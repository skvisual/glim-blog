const Blogpost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogpost = await Blogpost.findById(req.params.id)
    console.log(blogpost)
    res.render('post', {
        blogpost
    })
}