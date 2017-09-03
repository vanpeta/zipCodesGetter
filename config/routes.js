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
	// rp({
	// 	url: 'http://api.geonames.org/findNearbyPostalCodesJSON?postalcode='+zipCode+'&country='+country+'&radius='+radius+'&maxRows='+limit+'&username=callende'
	// })
	rp({
		url: 'http://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode='+zipCode+'&country='+'&minimumradius=0&maximumradius='+radius+'&key='+process.env.API_KEY,
		json: true
	})
	.then(function (response) {
		var firstChar = response.substring(0, 1);
		var firstCharCode = firstChar.charCodeAt(0);
		var zipCodes;
		if (firstCharCode == 65279) {
			console.log('First character "' + firstChar + '" (character code: ' + firstCharCode + ') is invalid so removing it.');
			zipCodes = response.substring(1);
		}
		zipCodes = JSON.parse(zipCodes);
		res.json(zipCodes)
	})
	.catch(console.error)
});

module.exports = router;