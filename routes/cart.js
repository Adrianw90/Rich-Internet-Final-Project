var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// GET cart page
router.get('/', function(req, res, next) {
    res.render('cart', { title: 'Cart' });
}
);

// POST cart page
router.post('/', function(req, res, next) {
    res.render('cart', { title: 'Cart' });
}
);



module.exports = router;