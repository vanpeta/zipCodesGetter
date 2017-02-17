console.log('loaded2')

var lat;
var lng;

$('#sendAddress').click(function() {
  $('#postalCodesWrapper').addClass('hidden');
  $('#postalCodes').empty();
  var address = document.getElementById('address').value;
  var radius = Math.round(document.getElementById('radius').value*1.61);
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
      url: "https://www.zipcodeapi.com/rest/LZ6oL7k2QGYDanDX9bA9AuQaGK2F51MR1SfMZzOQgNuqa7nkjYuTsl4966Ob7B28/radius.json/"+zipCode+"/"+radius+"/km",
      success: function (response) {
        console.log(response)
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
