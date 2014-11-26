$(function(){


if($('.reel').length > 0) {
  var movieReel = new VineMovie({
    source: '.reel'
  })
  movieReel.build()
  movieReel.start()
}

});