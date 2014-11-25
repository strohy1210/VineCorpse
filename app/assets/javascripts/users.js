$(function () {
  if ($('.my-movies').length > 0) {
    var $movies = $('.my-movies').children().find('.reel-test');
    for (var i = 0; i < $movies.length; i++) {
      var movieReel = new VineMovie({
        source: $movies.eq(i)
      });
      movieReel.build();
      movieReel.start();
    }
  }
});