let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({message: 'Welcome to the greatest api on earth!', success: true});
});

module.exports = router;
