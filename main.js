var lat;
var lng;
$('#sendAddress').click(function(e) {
  e.preventDefault();
  $('#postalCodes').empty();
  var address = document.getElementById('address').value;
  var radius = document.getElementById('radius').value;
  var numberOfResults = document.getElementById('numberOfResults').value;
  var addressForGoogle = encodeURIComponent(address);
  $.ajax({
  url: "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
  success: function(response){
      lat = response.results[0].geometry.location.lat;
      lng = response.results[0].geometry.location.lng;
    }
  }).then(function() {
    $.ajax({
      url: "http://api.geonames.org/findNearbyPostalCodesJSON?lat="+lat+"&lng="+lng+"&maxRows="+numberOfResults+"&radius="+radius+"&username=vanpeta",
      success: function (response) {
        response.postalCodes.forEach(function(e) {
          $('#postalCodes').append("'"+e.postalCode+"', ");
        })
      }
    });
  });
});

