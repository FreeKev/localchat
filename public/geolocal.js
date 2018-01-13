function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser. Please Update.</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        var place = results["0"].address_components[2].long_name
        var city = results["0"].address_components[3].long_name
        var address = results["0"].formatted_address
        var findZip = /\s\d{5}/;
        var findZip2 = /\d{5}/;
        var zipcode2 = address.match(findZip)[0];
        var zipcode = zipcode2.match(findZip2)[0];
        output.innerHTML = '<p class="z">Zipcode Chat ' + zipcode + ': ' + place + ', ' + city + '</p>' + '<input type="hidden" name="zipcode" value="' + zipcode + '">' + '<input type="hidden" name="place" value="' + place + '">';
      } else {
        console.log('not working');
      }
    });
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Long/Lat Get native Geolocation
// navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.latitude, position.coords.longitude)});
