//Version 8
function init() {
  //Find our div containers in the DOM
  var dataContainerOrientation = document.getElementById('dataContainerOrientation');
  var dataContainerAccuracy = document.getElementById('dataContainerAccuracy');
  var compassDirection = document.getElementById('compassDirection');
  var degreesOffNorth = document.getElementById('degreesOffNorth');

  //Container for phone type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var deviceType = document.getElementById('deviceType');
  //End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
  //Check for support for DeviceOrientation event
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
      var alpha;
      var accuracy;

      var northDegree;

      //Variable for phone type!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      var type;
      //End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      var beta = event.beta;
      var gamma = event.gamma;

      //Check for iOS property
      if(event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading;
        accuracy = event.webkitCompassAccuracy;

        //Tells the if statement that the device isan iPhone. Thus need to display Accuracy data.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type = 1;
        //End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      }

      //non iOS
      else {
        alpha = event.alpha;
        webkitAlpha = alpha;

        //Tells the if statement that the device is not an iPhone. Thus should have more Accurate data.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        type = 0;
        //End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if(!window.chrome) {
          webkitAlpha = alpha + 180;
        }
      }

      if (alpha > 180){
        northDegree = 360 - alpha;
      }
      else {
        northDegree = alpha;
      }

      if(alpha > 22.5 && alpha < 67.4){compassDirection.innerHTML = 'NE';}
      if(alpha > 67.5 && alpha < 112.4){compassDirection.innerHTML = 'E';}
      if(alpha > 112.5 && alpha < 157.4){compassDirection.innerHTML = 'SE';}
      if(alpha > 157.5 && alpha < 202.4){compassDirection.innerHTML = 'S';}
      if(alpha > 202.5 && alpha < 247.4){compassDirection.innerHTML = 'SW';}
      if(alpha > 247.5 && alpha < 292.4){compassDirection.innerHTML = 'W';}
      if(alpha > 292.5 && alpha < 337.4){compassDirection.innerHTML = 'NW';}
      if((alpha > 337.5 && alpha < 360) || (alpha > 0 && alpha < 22.4)){compassDirection.innerHTML = 'N';}
               
      if(alpha!=null || beta!=null || gamma!=null) 
        dataContainerOrientation.innerHTML = 'Alpha: ' + Math.round(alpha) + '<br/>Beta: ' + Math.round(beta) + '<br />Gamma: ' + Math.round(gamma);

      if(accuracy !=null) 
        dataContainerAccuracy.innerHTML = 'Accuracy: ' + accuracy + ' Degrees off';

      if(northDegree !=null) 
        degreesOffNorth.innerHTML =  Math.round(northDegree) + ' Degrees Off North';

      //For testing purposes will remove later if I can. Just recognises whether or not the device is an iPhone So I can test it properly.!!!!!!!!!!!!!!!!!!!!
      if(type == 1) {
        deviceType.innerHTML = 'iPhone';
      }
      else if(type == 0) {
        deviceType.innerHTML = 'Non-iPhone';
      }
      //End of what I will possibly remove.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    }, false);
  }
}