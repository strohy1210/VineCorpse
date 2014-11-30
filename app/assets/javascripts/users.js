$(function () {
  if ($('.my-movies').length > 0) {
    var $movies = $('.my-movies').children().find('.reel-test');
    for (var i = 0; i < $movies.length; i++) {
      if($movies.eq(i).children().length > 0){
        var movieReel = new VineMovie({
            source: $movies.eq(i)
          });
          movieReel.start();
        }
      }
  }
});