var express = require('express');
var router = express.Router();

// GET login page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

// POST login page
router.post('/', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;

    if (email == email && password == password) {
        res.redirect('/auth');
    } else {
        res.render('login', { error: 'Incorrect username or password' });
    }
});

module.exports = router;