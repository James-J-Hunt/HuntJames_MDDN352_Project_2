//Version 2
function init() {
  //Find our div containers in the DOM
  var dataContainerOrientation = document.getElementById('dataContainerOrientation');
  var dataContainerMotion = document.getElementById('dataContainerMotion');
 
  //Check for support for DeviceOrientation event
  if(window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
      var alpha = event.alpha;
      var beta = event.beta;
      var gamma = event.gamma;
               
      if(alpha!=null || beta!=null || gamma!=null) 
        dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;
    }, false);
  }
}