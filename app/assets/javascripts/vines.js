$(function(){

if($('.search_results').length < 1) {

var allVideos = document.getElementsByTagName("video");
  
  $("video").hide();
  $(allVideos[0]).show();
  allVideos[0].play();
  for(var i = 0; i < allVideos.length - 1; i++){
    allVideos[i].onended = (function (a) {
       return function() {         
        $(allVideos[a]).hide()
        $(allVideos[a + 1]).show()
        allVideos[a + 1].play() 
      }
    })(i);
  }

}

});
 