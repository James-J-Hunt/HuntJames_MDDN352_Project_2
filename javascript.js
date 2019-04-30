// Version 17

// Compass Code and alpha data etc inspired and adapted from HTML5 for the Mobile Web: Device Orientation Events
// https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events

// Map code is based completely on Google Maps Platform Geocoding Service code. Only a few lines of adjustments and additions
// Couldn't have had this functionalit without it, although I don't realy understand the code that well. Just well enough to
// Impliment the things I needed. Relevant code marked between two comments which say (// GMP - GS Start) and (// GMP - GS End)
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple?fbclid=IwAR3CdZ7HGf8jQHV5rKKkPwOL1HVNK8gpIPBZhMbb5ANB9yst2mW4YFrECdY

// Code also an combination of many helpful tutorials online but no major code taken just used to fix small issues

//Code for the compass and all the data it returns
function init() {
  // Variables to change the content of the HTML
  var compassDirection = document.getElementById('compassDirection'); // Cardinal Direction container
  var degreesOffNorth = document.getElementById('degreesOffNorth'); // How many degrees from north container
  var dataContainerOrientation = document.getElementById('dataContainerOrientation'); // Alpha, Beta, and Gamma container
  var dataContainerAccuracy = document.getElementById('dataContainerAccuracy'); // iPhone Accuracy container

  //Variable to change the background colour
  var backColour = document.querySelector('#container');

  // Container for phone type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var deviceType = document.getElementById('deviceType');
  // End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
  // Check for support for DeviceOrientation event and executes if the is support
  if(window.DeviceOrientationEvent) {
    // I think this is a continously executing function that is the core of the system. Based off of the Link at top and don't fully understand it
    window.addEventListener('deviceorientation', function(event) {
      var alpha; // Variable holder for alpha as it has different applications over different devises
      var accuracy; // Variable holder for alpha accuracy purely for iPhone use, can't be calculated yet
      var northDegree; // Variable holder for how many degrees you are from North, can't be calculated yet

      // Variable for phone type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      var type;
      // End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      var beta = event.beta;
      var gamma = event.gamma;

      // Check for iOS properties
      if(event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading; // Calculates where North is for iPhone. Not perfect.
        accuracy = event.webkitCompassAccuracy; // Calculates how inaccurate the variable above is.

        // Tells the if statement that the device isan iPhone. Thus need to display Accuracy data.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type = 1;
        // End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      }

      // Non iOS. I don't completely understand this bit. But I have tested and it works completely.
      else {
        alpha = event.alpha; // Sets alpha for Andriod.
        webkitAlpha = alpha; // To be used for the chrome.

        // Tells the if statement that the device is not an iPhone. Thus should have more Accurate data.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type = 0;
        // End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // For chrome apps on Andriod I believe as they use a slightly different system. The calculate is somewhat arbitrary but will work
        if(!window.chrome) {
          webkitAlpha = alpha + 180; // Don't know how this is working, but changing it fixes dicrepensies in the Andriod App
        }
      }

      // Calculates how many degrees the user is away from facing north using the alpha data obtained
      if (alpha > 180){
        northDegree = 360 - alpha; // Have to minus it as the value has to be between 0-180 and this reverses the process when passing South
      }
      else {
        northDegree = alpha; // No action needed so just applies the variable
      }

      // Variable to change the colour of the background depending on the equation (How many degrees away from North you are)
      var changeColour = 200 - (northDegree*0.6);

      // If you are pointing the phone within 5 degrees of North either side then changes to green colour.
      if (northDegree < 5){
        backColour.style.backgroundColor = 'rgb(66, 244, 101)';
      }
      // Fades the colour to darker the farther you point from North
      else {
        backColour.style.backgroundColor = 'rgb(' + changeColour + ', 60 , 60)';
      }

      // Calculates the data to be used to display the Cardinal Directions. 
      if(alpha > 22.5 && alpha < 67.4){compassDirection.innerHTML = 'NE';}
      if(alpha > 67.5 && alpha < 112.4){compassDirection.innerHTML = 'E';}
      if(alpha > 112.5 && alpha < 157.4){compassDirection.innerHTML = 'SE';}
      if(alpha > 157.5 && alpha < 202.4){compassDirection.innerHTML = 'S';}
      if(alpha > 202.5 && alpha < 247.4){compassDirection.innerHTML = 'SW';}
      if(alpha > 247.5 && alpha < 292.4){compassDirection.innerHTML = 'W';}
      if(alpha > 292.5 && alpha < 337.4){compassDirection.innerHTML = 'NW';}
      if((alpha > 337.5 && alpha < 360) || (alpha > 0 && alpha < 22.4)){compassDirection.innerHTML = 'N';}
      
      // Only executes if that data is available. Inputs the Alpha, Beta, and Gamma data into the corresponding container
      if(alpha!=null || beta!=null || gamma!=null) 
        dataContainerOrientation.innerHTML = 'Alpha: ' + Math.round(alpha) + '<br/>Beta: ' + Math.round(beta) + '<br />Gamma: ' + Math.round(gamma);

      // Only executes if that data is available. Inputs the accuracy of the data for iPhones (only applicable to them) into the corresponding container
      if(accuracy !=null) 
        dataContainerAccuracy.innerHTML = 'Accuracy: ' + accuracy + ' Degrees off';

      // Only executes if that data is available. Inputs the data of how many degrees from north you are facing into the corresponding container
      if(northDegree !=null) 
        degreesOffNorth.innerHTML =  Math.round(northDegree) + ' Degrees Off North';

      // For testing purposes will remove later if I can. Just recognises whether or not the device is an iPhone So I can test it properly.!!!!!!!!!!!!!!!!!!!!
      if(type == 1) {
        deviceType.innerHTML = 'iPhone';
      }
      else if(type == 0) {
        deviceType.innerHTML = 'Non-iPhone';
      }
      // End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    }, false); // This could also be what loops the code. I am not fully sure
  }
}






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
    document.getElementById('latC').innerHTML = latC;
    document.getElementById('longC').innerHTML = longC;
    document.getElementById('latD').innerHTML = latD;
    document.getElementById('longD').innerHTML = longD;
    console.log("Executed!");
  });
}