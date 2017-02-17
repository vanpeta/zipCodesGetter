console.log('loaded')


var lat;
var lng;

$('#sendAddress').click(function() {
  $('#postalCodesWrapper').addClass('hidden');
  $('#postalCodes').empty();
  var address = document.getElementById('address').value;
  var radius = Math.round(document.getElementById('radius').value*1.61) || 10;
  var numberOfResults = document.getElementById('numberOfResults').value || 500;
  var addressForGoogle = encodeURIComponent(address);
  var zipCode;
  $.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
  success: function(response){
      zipCode = response.results[0].address_components[7].long_name;
    }
  }).then(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "/upload?zipcode="+zipCode+"&radius="+radius
      }).done(function (zipCodes) {
        var totalZipCodes = zipCodes.length;
        if (zipCodes.length > numberOfResults) {
          zipCodes.splice(numberOfResults, zipCodes.length-numberOfResults);
        }
        $('#postalCodesWrapper').removeClass('hidden');
        zipCodes.forEach(function (zc) {
          $('#postalCodes').append("<div class='code'>'"+zc.zip_code+"', </div>");
        });
        $('.total').remove();
        $('#postalCodesWrapper').prepend('<div class="total">Postal Codes found: '+totalZipCodes+"</div");
      });
    });
  });
