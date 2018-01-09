// console.log('Yes, UP and running geolocal');

// if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var lat = position.coords.latitude;
//         var long = position.coords.longitude;
//         var point = new google.maps.LatLng(lat, long);
//         new google.maps.Geocoder().geocode(
//             {'latLng': point},
//             function (res, status) {
//                 var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
//                 $("#location").val(zip[1]);
//             }
//         );
//     });
// }

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser. Please Update.</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    // output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        // alert("The user's zipcode is "+results["0"].address_components[7].long_name);
        output.innerHTML = '<p>Zipcode Chat ' + results["0"].address_components[7].long_name + ': ' + results["0"].address_components[2].long_name + ', ' + results["0"].address_components[3].long_name + '</p>';
      } else {
        console.log('not working');
      }
    });

    // var img = new Image();
    // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    //
    // output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

// Long/Lat Get native Geolocation
// navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords.latitude, position.coords.longitude)});
