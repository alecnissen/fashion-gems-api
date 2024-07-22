const express = require('express');
const router = express.Router();
const checkoutFormController = require('../controllers/checkoutFormController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkout', checkoutFormController.createCheckoutForm);

module.exports = router;


