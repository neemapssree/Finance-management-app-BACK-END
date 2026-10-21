var express = require('express');
var router = express.Router();

/* GET backend status check */
router.get('/', function(req, res, next) {
  res.json({ 
    success: true,
    message: "Finance Management Back-end API is running successfully!" 
  });
});

module.exports = router;