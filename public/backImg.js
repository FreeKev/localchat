function geoFindImg() {
  var output = document.getElementById("out");
  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=600x600&sensor=false";
    output.appendChild(img);
  }
  function error() {
    console.log('error geolocal rendering');
  }
  navigator.geolocation.getCurrentPosition(success, error);
}
