var express = require('express');
var router = express.Router();

// Get the admin page
router.get('/', (req, res) => {
    res.render('admin', {title: 'Admin'});
});

module.exports = router;