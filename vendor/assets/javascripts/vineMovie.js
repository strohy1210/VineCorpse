var VineMovie = (function($) {
  
  function _VineMovie(spec) {
    this.$el = $(spec.source)
    this.domVideoElements = []
    this.videoUrls = spec.videoUrls
    this.muted = spec.muted || true
    this.currentVideo = 0
  }

  _VineMovie.prototype.build = function(){
    this.$reel = $("<div>")
    this.$reel.attr("class", "reel")
    this.$el.append(this.$reel)

    _formatVideosToReel.call(this);
    
  }

  _VineMovie.prototype.start = function() {
    $(this.currentDomVideo()).show();
    this.currentDomVideo().play();    
  }

  _VineMovie.prototype.currentDomVideo = function() {
    return this.$el.find("video").get(this.currentVideo)
  }

  _VineMovie.prototype.playNext = function() {
    $(this.currentDomVideo()).hide();

    this.currentVideo = (this.currentVideo + 1) % this.$el.find("video").length;  

    $(this.currentDomVideo()).show();
    this.currentDomVideo().play();
  }


  function _formatVideosToReel() {
    var $videos = this.$el.find('video'),
        self = this;

    for(var i = 0; i < $videos.length; i++) {
      $videos.eq(i).hide()
      $videos.eq(i).on('ended', function(){
        self.playNext()
      });
      $videos.eq(i).on('remove', function(){
        self.playNext()
      });

    }
  }

  return _VineMovie;

})(jQuery);