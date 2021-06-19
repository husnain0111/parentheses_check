let express = require('express');
let router = express.Router();

let { MainController } = require("@controllers");

// Login User
router.post("/checkbrackets", MainController.checkBrackets);

module.exports = router;
