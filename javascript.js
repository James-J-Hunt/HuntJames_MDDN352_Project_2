//Version 3
function init() {
  //Find our div containers in the DOM
  var dataContainerOrientation = document.getElementById('dataContainerOrientation');
 
  //Check for support for DeviceOrientation event
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
      var alpha;

      var beta = event.beta;
      var gamma = event.gamma;

      //Check for iOS property
      if(event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading;
      }

      //non iOS
      else {
        alpha = event.alpha;
        webkitAlpha = alpha;
        if(!window.chrome) {
          //Assume Android stock (this is crude, but good enough for our example) and apply offset
          webkitAlpha = alpha-270;
        }
      }
               
      if(alpha!=null || beta!=null || gamma!=null) 
        dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
    }, false);
  }
}