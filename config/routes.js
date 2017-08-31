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
	var country = req.query.country;
	var radius = req.query.radius;
	var limit = req.query.limit;
	// rp({
	// 	url: 'https://www.zipcodeapi.com/rest/'+process.env.KEY+'/radius.json/'+zipCode+'/'+radius+'/km',
	// 	json: true
	// })
	rp({
		url: 'http://api.geonames.org/findNearbyPostalCodesJSON?postalcode='+zipCode+'&country='+country+'&radius='+radius+'&maxRows='+limit+'&username=callende'
	})
	.then(function (response) {
		console.log(response)
		var zipCodes = JSON.parse(response);
		res.send(zipCodes)
	})
	.catch(console.error)
});

module.exports = router;
