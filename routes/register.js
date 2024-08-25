var express = require('express');   
var router = express.Router();      // define router

// GET register page
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
    }
);

// Store user data in session storage
router.post('/', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.password2;

    if (email != null && password != null && password2 != null && password === password2) {
        req.session.email = email;
        req.session.password = password;
        res.redirect('/', { error: null });
    } else {
        res.render('register', { error: 'Passwords do not match' });
    }
});

module.exports = router;