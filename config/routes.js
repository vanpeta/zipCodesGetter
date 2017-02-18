var express = require('express');
var router = express.Router();
var rp = require('request-promise');

// --------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html');
})

router.get('/upload', function (req, res, next) {
	var zipCode = req.query.zipcode;
	var radius = req.query.radius;
	rp({
		url: 'https://www.zipcodeapi.com/rest/'+process.env.KEY+'/radius.json/'+zipCode+'/'+radius+'/km',
		json: true
	})
	.then(function (response) {
		res.json(response.zip_codes)
	})
	.catch(console.error)
});

module.exports = router;
