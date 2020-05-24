const Blogpost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogpost = await (await Blogpost.findById(req.params.id)).populated('userid');
    console.log(blogpost)
    res.render('post', {
        blogpost
    })
}