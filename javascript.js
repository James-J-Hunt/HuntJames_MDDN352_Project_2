//Version 4
function init() {
  //Find our div containers in the DOM
  var dataContainerOrientation = document.getElementById('dataContainerOrientation');
  var dataContainerAccuracy = document.getElementById('dataContainerAccuracy');
  var deviceType = document.getElementById('deviceType');
 
  //Check for support for DeviceOrientation event
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
      var alpha;
      var accuracy;
      var type;

      var beta = event.beta;
      var gamma = event.gamma;

      //Check for iOS property
      if(event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading;
        accuracy = event.webkitCompassAccuracy;
        type = 1;
      }

      //non iOS
      else {
        alpha = event.alpha;
        webkitAlpha = alpha;
        type = 0;

        if(!window.chrome) {
          //Assume Android stock (this is crude, but good enough for our example) and apply offset
          webkitAlpha = alpha-270;
        }
      }
               
      if(alpha!=null || beta!=null || gamma!=null) 
        dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;

      if(accuracy !=null) 
        dataContainerAccuracy.innerHTML = 'accuracy: ' + accuracy;

      if(type == 1) {
        deviceType.innerHTML = 'iPhone';
      }
      else if(type == 0) {
        deviceType.innerHTML = 'Non-iPhone';
      }
    }, false);
  }
}