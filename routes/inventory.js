var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('inventory', {title: 'Inventory'});
});

module.exports = router;