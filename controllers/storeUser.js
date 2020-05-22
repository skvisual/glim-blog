const User = require('../models/UserModel');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        res.redirect('/')
    })
}