$(function(){

// if there's a class reel that exists on the page
// with something in it

if($('.reel').length > 0) {
  var movieReel = new VineMovie({
    source: '.reel'
  })
  movieReel.build()
  movieReel.start()
}


var videosList = document.getElementsByClassName("clips")
if (videosList && videosList.length>0) {
videosList[0].play();
 for(var i = 0; i < videosList.length - 1; i++){
   videosList[i].onended = (function (a) {
      return function() {         
       videosList[a + 1].play() 
     }
   })(i);

}
}
})