toVision = function() {
  document.getElementById('login-form').style.display='none';
  document.getElementById('mission').style.display='none';
  document.getElementById('vision').style.display='block';
}

toLogin = function() {
  document.getElementById('vision').style.display='none';
  document.getElementById('login-form').style.display='block';
  document.getElementById('mission').style.display='none';

}

toMission = function() {
  document.getElementById('mission').style.display='block';
  document.getElementById('vision').style.display='none';
  document.getElementById('login-form').style.display='none';
}
