$(function(){

// if there's a class reel that exists on the page
// with something in it

var $vidForMovie = $(".reel");
 if ($vidForMovie && $vidForMovie.length > 0) {
    $vidForMovie.hide();
    $vidForMovie.eq(0).show();
    $vidForMovie[0].play();

     for(var i = 0; i < $vidForMovie.length - 1; i++){
       $vidForMovie[i].onended = (function (a) {
          return function() {         
           $vidForMovie.eq(a).hide()
           $vidForMovie.eq(a + 1).show()
           $vidForMovie[a + 1].play() 
         }
       })(i);
     }
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
 