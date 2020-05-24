const User = require('../models/UserModel');

module.exports = (req, res) => {
    User.findById(req.session.userId, (error, user) => {
        if(error || !user)
            return res.redirect('/')

        next()
    })
}