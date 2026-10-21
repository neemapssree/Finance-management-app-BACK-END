var express = require('express');
var router = express.Router();

/* GET home page status endpoint */
router.get('/', function(req, res, next) {
  res.json({ 
    status: "success", 
    message: "Finance Management Backend API is online and running smoothly!" 
  });
});

module.exports = router;
