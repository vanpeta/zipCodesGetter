var lat;
var lng;
$('#sendAddress').click(function(e) {
  e.preventDefault();
  $('#postalCodesWrapper').addClass('hidden');
  $('#postalCodes').empty();
  var address = document.getElementById('address').value;
  var radius = Math.round(document.getElementById('radius').value*1.61);
  var numberOfResults = document.getElementById('numberOfResults').value || 500;
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
        $('#postalCodesWrapper').removeClass('hidden');
        response.postalCodes.forEach(function(e) {
          $('#postalCodes').append("<div class='code'>'"+e.postalCode+"', </div>");
        })
        $('.total').remove();
        $('#postalCodesWrapper').prepend('<div class="total">Postal Codes found: '+$('.code').length+"</div");
      }
    });
  });
});

