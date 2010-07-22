  /*
   * jqDnR-touch - Minimalistic Drag'n'Resize for jQuery.
   *
   * based on work Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
   *
   * heavily modified by @gaarf for:
   *    - touch support
   *    - z-index upping
   *    - legibility
   *
   * Licensed under the MIT License:
   * http://www.opensource.org/licenses/mit-license.php
   */

(function($){

  var DOWN = 'mousedown touchstart', 
      MOVE = 'mousemove touchmove', 
      STOP = 'mouseup touchend',
      E, M = {}, Z = 1;

  function xy(v) {
    var y = v.pageY, 
        x = v.pageX, 
        t = v.originalEvent.targetTouches;
    if(t) {
      x = t[0]['pageX'];
      y = t[0]['pageY'];
    }
    return {x:x,y:y};
  }

  function init(e,h,k){ 
    return e.each( function(){
      var $box = $(this),
          $handle = (h) ? $(h,this).css('cursor',k) : $box;
      $handle.bind(DOWN, {e:$box,k:k}, onGripStart);
      if(k=='move') {
        $box.bind(DOWN,{},function(){$box.css('z-index', Z++);});
      }
    });
  };

  function onGripStart(v) {
    var p = xy(v), f = function(k) { return parseInt(E.css(k))||false; };
    E = v.data.e.css('z-index', Z++);
    M = {
      X:f('left')||0, Y:f('top')||0, 
      W:f('width')||E[0].scrollWidth||0, H:f('height')||E[0].scrollHeight||0,
      pX:p.x, pY:p.y, k:v.data.k, o:E.css('opacity')
    };
    E.css({opacity:0.7}).trigger('jqDnRstart');
    $(document).bind(MOVE,onGripDrag).bind(STOP,onGripStop);
    return false;
  };

  function onGripDrag(v) {
    var p = xy(v);
    if(M.k == 'move') { 
      if(E.css('position')!='absolute') {
        E.css({position:'relative'});
      }
      E.css({ left:M.X+p.x-M.pX, top:M.Y+p.y-M.pY } );
    }
    else { // resize
      E.css({ width:Math.max(p.x-M.pX+M.W,0), height:Math.max(p.y-M.pY+M.H,0) });
    }
    return false;
  };

  function onGripStop() {
    $(document).unbind(MOVE,onGripDrag).unbind(STOP,onGripStop);
    E.css({opacity:M.o}).trigger('jqDnRstop');
  };

  $.fn.jqDrag = function(h) { return init(this, h, 'move'); };
  $.fn.jqResize = function(h) { return init(this, h, 'se-resize'); };

})(jQuery);