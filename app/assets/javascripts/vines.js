$(function(){

var allVideos = document.getElementsByTagName("video");

allVideos[0].play();

for(var i = 0; i < allVideos.length - 1; i++){
  allVideos[i].onended = (function (a) {
     return function() { allVideos[a + 1].play() }
  })(i);
}

});
 