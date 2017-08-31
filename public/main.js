var zipCode;
var country;
$('#sendAddress').click(function() {
  $('#postalCodesWrapper').addClass('hidden');
  $('#postalCodes').empty();
  var address = document.getElementById('address').value;
  var radius = Math.round(document.getElementById('radius').value*1.61) || 12;
  if (radius > 30) {
    radius = 30;
  }
  var numberOfResults = document.getElementById('numberOfResults').value || 500;
  var addressForGoogle = encodeURIComponent(address);
  var lat;
  var lng;
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
    success: function(response){
      lat = response.results[0].geometry.location.lat;
      lng = response.results[0].geometry.location.lng;
    }
  }).then(function() {
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false",
      success: function(response) {
        for(var i=0; i < response.results[0].address_components.length; i++) {
          var component = response.results[0].address_components[i];
          if(component.types[0] == "postal_code") {
            zipCode = component.long_name;
          }
          if (component.types[0] == "country") {
            country = component.short_name;
          }
        }
        console.log("country ="+ country)
        $.ajax({
          type: 'GET',
          url: "/upload?zipcode="+zipCode+"&radius="+radius+"&limit="+numberOfResults+"&country="+country,
          error: function(xhr, options, err) {
            alert(xhr.responseJSON)
          }
        }).done(function (response) {
          var zipCodes = response.postalCodes;
          console.log(zipCodes);
          if (zipCodes.length > numberOfResults) {
            zipCodes.splice(numberOfResults, zipCodes.length-numberOfResults);
          }
          $('#postalCodesWrapper').removeClass('hidden');
          zipCodes.forEach(function (zipCode) {
            $('#postalCodes').append("<div class='code'>'"+zipCode.postalCode+"', </div>");
          });
          $('.total').remove();
          $('#postalCodesWrapper').prepend('<div class="total">Postal Codes found: '+zipCodes.length+"</div>");
        });
      }
    })
  });
});
