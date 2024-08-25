var express = require('express');
var router = express.Router();
var path = require('path');

// Authentication for login
router.get('/login', (req, res) => {
    res.render('/login', {error: null});
});

router.post('/login', (req, res) => {
    let email = req.body.username;
    let password = req.body.password;

    if (email != null && password != null) {
        res.redirect('/userprofile');
    } else {
        res.render('pages/login', {error: 'Invalid username or password'});
    }
});

module.exports = router;