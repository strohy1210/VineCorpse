$(function(){


if($('.reel').length > 0) {
  var movieReel = new VineMovie({
    source: '.reel',
    controls: true
  })
  movieReel.start()
}

if($('.reel-index').length > 0) {
  var movieReel = new VineMovie({
    source: '.reel-index',
    controls: false
  })
  movieReel.start()
}

});