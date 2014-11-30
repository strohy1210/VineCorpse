var VineMovie = (function($) {
  
  function _VineMovie(spec) {
    this.$el = $(spec.source)
    this.domVideoElements = []
    this.muted = spec.muted || true
    this.currentVideo = 0
    this.controlStep = spec.controlStep || 0.01
    this.controls = spec.controls || false;
    this.volumeControls = spec.volumeControls || true;

    if(spec.ajaxLoaderElement) {
      this.$ajaxLoader = $(ajaxLoaderElement);
    } else {
      this.$ajaxLoader = $("<span>Loading...</span>");
    }
    
  }

  _VineMovie.prototype.start = function(){
    _formatVideosToReel.call(this);
    this.ready(function() {
      $(this.$ajaxLoader).hide();
      if(this.allVideos().length > 0) {
        this.play();
        if(this.controls) {
          _addVideoControls.call(this);      
        }

        if(this.volumeControls) {
          _addVolumeControls.call(this);
        }
      }
    })
  }


  _VineMovie.prototype.allVideos = function() {
    return this.$el.find("video.reel-clip");
  }

  _VineMovie.prototype.currentDomVideo = function() {
    return this.allVideos().get(this.currentVideo)
  }

  _VineMovie.prototype.playNext = function() {
    _hideAllVideos.call(this);
    this.currentDomVideo().pause();
    _updateCurrentVideoCounter.call(this)    
    this.play();
  }

  _VineMovie.prototype.play = function() {
    this.show();
    this.currentDomVideo().play();
  }

  _VineMovie.prototype.show = function() {
    $(this.currentDomVideo()).show();
  }  

  _VineMovie.prototype.stop = function() {
   this.currentDomVideo().pause(); 
  }

  _VineMovie.prototype.isPlaying = function() {
    return !(this.currentDomVideo().paused)
  }

 _VineMovie.prototype.ready = function(callback) {
    var self = this;
    var readyInterval = setInterval(function() {
      var numberOfVideosReady = $.grep(self.allVideos(), function(ele) {
        return ele.readyState > 1
      });  

      if(numberOfVideosReady.length === self.allVideos().length) {
        clearInterval(readyInterval);
        callback.call(self);
      }
    })    
  }


  //private methods
  function _hideAllVideos() {
    $(this.$el.find("video")).hide();    
  }

  function _updateCurrentVideoCounter() {
    this.currentVideo = (this.currentVideo + 1) % this.$el.find("video.reel-clip").length;  
  }

  function _formatVideosToReel() {
    var $videos = this.$el.find('video'),
        reel = this;

        _setLoadingStatus.call(this)
    
    for(var i = 0; i < $videos.length; i++) {
      $videos.eq(i).hide();
      $videos.attr('preload', 'metadata');
      $videos.attr('muted', 'true');
      $videos.eq(i).addClass('reel-clip');
      $videos.eq(i).attr('data-order', i);
      $videos.eq(i).on('ended', function(){
        reel.playNext();
      });

      if(reel.controls){
        $videos.eq(i).on('timeupdate', function(event) {
          var order = $(reel.currentDomVideo()).data('order');
          var currentTime = reel.currentDomVideo().currentTime;
          reel.$controls.val(_getMaxLengthUpto(reel.allVideos(), order) + currentTime)
          
        })
      }

      $videos.eq(i).on('click', function(e) {
        if(reel.isPlaying()) {
          reel.stop();
        } else{
          reel.play();
        }
      });

      $videos.eq(i).hover( function() {
        console.log('hover on', reel.$volumeControls.hasClass('controls-inactive'))
        if(reel.$volumeControls.hasClass('controls-inactive')) {
          reel.$volumeControls.removeClass('controls-inactive');
          reel.$volumeControls.addClass('controls-active');
        }
      }, function() {
        console.log('hover on', reel.$volumeControls.hasClass('controls-active'))
        if(reel.$volumeControls.hasClass('controls-active')) {
          reel.$volumeControls.removeClass('controls-active');
          reel.$volumeControls.addClass('controls-inactive')
        }        
      });

    }
  }


  function _setLoadingStatus() {
    _hideAllVideos.call(this);
    this.$el.prepend(this.ajaxLoader)
  }


  function _reassignReelOrder() {
    var $videos = this.allVideos();
    for(var i = 0; i < $videos.length; i++) {
      $videos.eq(i).attr('data-order', i);
    }
  }

  function _addVideoControls() {
    var $controls = $("<input type='range' class='reel-clip-controls slider' min='0' step='"+ this.controlStep + "'>");
    $controls.attr('max', _getMaxLengthFrom(this.allVideos()));
    $controls.val(0);

    var self = this;

    $controls.on('mousedown', function(event) {
      self.stop();
    });

    $controls.on('input', function(event) {
      
      var videoInfo = _getVideoFromDuration(self.allVideos(), event.target.value);
      
      if(videoInfo){
         _hideAllVideos.call(self);  
        self.currentVideo = videoInfo.videoOrder;
        self.currentDomVideo().currentTime = videoInfo.seektime
        self.show()
      }
    });
    this.$controls = $controls;
    this.$el.append($controls);
  }

  function _addVolumeControls() {
    var $controls = $("<a href='#' class='reel-clip-volume controls-inactive volume-off'>"),
        reel = this;

    $controls.click(function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      var volumeControl = $(this);
      if(volumeControl.hasClass('volume-on')) {
        volumeControl.removeClass('volume-on');
        volumeControl.addClass('volume-off');
        reel.allVideos().each(function() {
          this.muted = true;
        })
        
      } else {
        volumeControl.removeClass('volume-off');
        volumeControl.addClass('volume-on');        
        reel.allVideos().each(function() {
          this.muted = false;
        })
      }
    })

    this.$volumeControls = $controls;
    this.$el.prepend($controls);
  }

  function _getVideoFromDuration($videos, duration) {    
    var total = 0;
    for(var i = 0; i < $videos.length; i++) {
      if(duration >= total && duration <= ($videos.get(i).duration + total) ) {
        return { videoOrder: $videos.eq(i).data('order'), seektime: (duration - total) }
      }
      total += $videos.get(i).duration
    }
    return null;    
  }

  function _getMaxLengthFrom($videos, position) {
    var total = 0;
    for(var i = 0; i < $videos.length; i++) {
      total += $videos.get(i).duration
    }
    return total;
  }

  function _getMaxLengthUpto($videos, position) {
    var total = 0;
    for(var i = 0; i < position; i++) {
      total += $videos.get(i).duration
    }
    return total;
  }  

  return _VineMovie;

})(jQuery);