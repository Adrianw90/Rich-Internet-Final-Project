var express = require('express');
var router = express.Router();

// Get userprofile page
router.get('/', function(req, res) {
    res.render('userprofile', { title: 'User Profile' });
});

// Post userprofile page
router.post('/', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (email != email && password != password) {
        res.redirect('/login');
    } else {
        res.render('userprofile', { title: 'User Profile' });
    }
});

module.exports = router;