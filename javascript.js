// Version 20

// Map code is based completely on Google Maps Platform Geocoding Service code. Only a few lines of adjustments and additions
// Couldn't have had this functionalit without it, although I don't realy understand the code that well. Just well enough to
// Impliment the things I needed. Relevant code marked between two comments which say (// GMP - GS Start) and (// GMP - GS End)
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple?fbclid=IwAR3CdZ7HGf8jQHV5rKKkPwOL1HVNK8gpIPBZhMbb5ANB9yst2mW4YFrECdY

// Code also an combination of many helpful tutorials online but no major code taken just used to fix small issues

var latD;
var longD;

// GMP - GS Start
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -41.286, lng: 174.776} // Changed coordinates to focus on Wellington
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  var latLong2 = document.getElementById('latLong2'); // My addition. Holds the container to show the coordinate data for desire location

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var lat = marker.getPosition().lat(); // My addition. Gets the latitude of the desire location and holds it in a variable
      var long = marker.getPosition().lng(); // My addition. Gets the longitude of the desire location and holds it in a variable
      coordinates(lat, long); // My addition. Starts the coordinates function
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
// GMP - GS End

function coordinates(latD, longD) {
  navigator.geolocation.watchPosition(function(position) {
    var latC = position.coords.latitude;
    var longC = position.coords.longitude; 

    var pointA = new google.maps.LatLng(latC, longC);
    var pointB = new google.maps.LatLng(latD, longD);

    var heading = google.maps.geometry.spherical.computeHeading(pointA, pointB);

    var backColour = document.querySelector('#container');

    if (heading < 5 || heading > -5){
      backColour.style.backgroundColor = 'rgb(66, 244, 101)';
    }
    else if (heading < -5) {
      backColour.style.backgroundColor = 'rgb(' + (changeColour*-1) + ', 60 , 60)';
    }
    else {
      backColour.style.backgroundColor = 'rgb(' + changeColour + ', 60 , 60)';
    }
    document.getElementById('latC').innerHTML = latC;
    document.getElementById('longC').innerHTML = longC;
    document.getElementById('latD').innerHTML = latD;
    document.getElementById('longD').innerHTML = longD;
    document.getElementById('heading').innerHTML = heading;
  });
}