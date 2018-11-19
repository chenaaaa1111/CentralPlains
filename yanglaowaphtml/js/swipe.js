/*
 * Swipe 2.0
 *
 * Brad Birdsall
 * Copyright 2013, MIT License
 *
 */

function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) {
    setTimeout(fn || noop, 0)
  }; // offload a functions execution

  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for (var i in props)
        if (temp.style[props[i]] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  options.continuous = options.continuous !== undefined ? options.continuous : true;

  function setup() {
    // cache slides
    slides = element.children;
    length = slides.length;

    // set continuous to false if only one slide
    if (slides.length <= 2) options.continuous = false;

    //special case if two slides
    if (browser.transitions && options.continuous && slides.length < 3) {
      element.appendChild(slides[0].cloneNode(true));
      element.appendChild(element.children[1].cloneNode(true));
      slides = element.children;
    }

    // create an array to store current positions of each slide
    slidePos = new Array(slides.length);

    // determine width of each slide
    width = container.getBoundingClientRect().width || container.offsetWidth;

    element.style.width = (slides.length * width) + 'px';

    // stack elements
    var pos = slides.length;
    while (pos--) {
      var slide = slides[pos];
      slide.style.width = width + 'px';
      slide.setAttribute('data-index', pos);

      if (browser.transitions) {
        slide.style.left = (pos * -width) + 'px';
        move(pos, index > pos ? -width : (index < pos ? width : 0), 0);
      }
    }

    // reposition elements before and after index
    if (options.continuous && browser.transitions) {
      move(circle(index - 1), -width, 0);
      move(circle(index + 1), width, 0);
    }

    if (!browser.transitions) element.style.left = (index * -width) + 'px';
    container.style.visibility = 'visible';
  }

  function circle(index) {
    // a simple positive modulo using slides.length
    return (slides.length + (index % slides.length)) % slides.length;
  }

  function move(index, dist, speed) {
    translate(index, dist, speed);
    slidePos[index] = dist;
  }

  function translate(index, dist, speed) {
    var slide = slides[index];
    var style = slide && slide.style;
    if (!style) return;
    style.webkitTransitionDuration =
      style.MozTransitionDuration =
      style.msTransitionDuration =
      style.OTransitionDuration =
      style.transitionDuration = speed + 'ms';
    style.webkitTransform = 'translate(' + dist + 'px,0)' + 'translateZ(0)';
    style.msTransform =
      style.MozTransform =
      style.OTransform = 'translateX(' + dist + 'px)';
  }

  // setup auto slideshow
  var delay = options.auto || 0;
  var interval;

  function begin() {

    interval = setTimeout(next, delay);

  }

  function stop() {

    delay = 0;
    clearTimeout(interval);

  }

  // setup initial vars
  var start = {};
  var delta = {};
  var isScrolling;

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart':
          this.start(event);
          break;
        case 'touchmove':
          this.move(event);
          break;
        case 'touchend':
          offloadFn(this.end(event));
          break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        case 'transitionend':
          offloadFn(this.transitionEnd(event));
          break;
        case 'resize':
          offloadFn(setup);
          break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };

      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if (event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if (typeof isScrolling == 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
      }
      // if user is not trying to scroll vertically
      if (!isScrolling) {
        // prevent native scrolling
        event.preventDefault();
        // stop slideshow
        stop();

        // increase resistance if first or last slide
        if (options.continuous) { // we don't add resistance at the end
          translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0);

        } else {

          delta.x =
            delta.x /
            ((!index && delta.x > 0 // if first slide and sliding left
                || index == slides.length - 1 // or if last slide and sliding right
                && delta.x < 0 // and if sliding at all
              ) ?
              (Math.abs(delta.x) / width + 1) // determine resistance level
              : 1); // no resistance if false

          // translate 1:1
          translate(index - 1, delta.x + slidePos[index - 1], 0);
          translate(index, delta.x + slidePos[index], 0);
          translate(index + 1, delta.x + slidePos[index + 1], 0);
        }

      }

    },
    end: function(event) {
      // measure duration
      var duration = +new Date - start.time;

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
        Number(duration) < 250 // if slide duration is less than 250ms
        && Math.abs(delta.x) > 20 // and if slide amt is greater than 20px
        || Math.abs(delta.x) > width / 2; // or if slide amt is greater than half the width

      // determine if slide attempt is past start and end
      var isPastBounds = !index && delta.x > 0 // if first slide and slide amt is greater than 0
        || index == slides.length - 1 && delta.x < 0; // or if last slide and slide amt is less than 0

      if (options.continuous) isPastBounds = false;

      // determine direction of swipe (true:right, false:left)
      var direction = delta.x < 0;

      // if not scrolling vertically
      if (!isScrolling) {
        if (isValidSlide && !isPastBounds) {
          if (direction) {
            if (options.continuous) { // we need to get the next in this direction in place
              move(circle(index - 1), -width, 0);
              move(circle(index + 2), width, 0);
            } else {
              move(index - 1, -width, 0);
            }
            move(index, slidePos[index] - width, speed);
            move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
            index = circle(index + 1);
          } else {
            if (options.continuous) { // we need to get the next in this direction in place
              move(circle(index + 1), width, 0);
              move(circle(index - 2), -width, 0);
            } else {
              move(index + 1, width, 0);
            }
            move(index, slidePos[index] + width, speed);
            move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
            index = circle(index - 1);
          }
          options.callback && options.callback(index, slides[index]);
        } else {
          if (options.continuous) {
            move(circle(index - 1), -width, speed);
            move(index, 0, speed);
            move(circle(index + 1), width, speed);
          } else {
            move(index - 1, -width, speed);
            move(index, 0, speed);
            move(index + 1, width, speed);
          }
        }
      }

      // kill touchmove and touchend event listeners until touchstart called again
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)
    },
    transitionEnd: function(event) {
      if (parseInt(event.target.getAttribute('data-index'), 10) == index) {
        if (delay) begin();
        options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);

      }
    }

  }

  // trigger setup
  setup();
  
  // start auto slideshow if applicable
  if (delay) begin();
  // add event listeners
  if (browser.addEventListener) {
    // set touchstart event on element
    if (browser.touch) element.addEventListener('touchstart', events, false);

    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }
    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {
    window.onresize = function() {
      setup()
    }; // to play nice with old IE

  }

}


$(function() {
    /*隐藏loading*/
    $('.loading').hide();
    (function() {
        var swipeNum = $('.swipe-wrapBox').length;
        $('#mySwipeFootB .number').html(swipeNum);
        if (swipeNum === 0) {
            $('#mySwipeFootB .cur').html(swipeNum);
        }
        var wh = $(window).height() * 0.82;
        $('.brokerContact').css({
            'bottom': -800 + 'px'
        });

        $("#mySwipe").find(".swipe-title i").click(function() {
            $(this).parent().hide();
        });
        
        function askfree(obj) {
            $(obj).click(function (e) {
                e.stopPropagation();
                $("#brokerWapper").animate({
                    'bottom': 0
                });
                $('.popbg').css({
                    zIndex: 93,
                    display: 'block',
                    opacity: 0.5
                });
            });
        }
    })();
    
    /*图片和数字对应*/
    showSwipeImage(0);
    var elem = document.getElementById('mySwipe');
    window.mySwipe = Swipe(elem, {
        transitionEnd: function(index, element) {
            showSwipeImage(index);
            $('#mySwipeFootB .cur').html(index + 1);
        }
    });

    function showSwipeImage(index) {
        var srcPhoto = $('.swipe-wrap .swipe-wrapBox').eq(index).find('img').attr('data-swipe');
        var newImg = new Image();
        newImg.src = srcPhoto;
        newImg.onload = function() {
            $('.swipe-wrap .swipe-wrapBox').eq(index).find('img').attr('src', srcPhoto);
        }
    }
});
    

/*左右滑动栏*/
(function() {
    function setBorderBoxWidth(element, width) {
        var el = $(element);
        var bl = parseInt(el.css('border-left-width'));
        var br = parseInt(el.css('border-right-width'));
        var pl = parseInt(el.css('padding-left'));
        var pr = parseInt(el.css('padding-right'));
        var w = width - bl - br - pl - pr;
        el.width(w);
    }

    function setBorderBoxHeight(element, height) {
        var el = $(element);
        var bl = parseInt(el.css('border-top-width'));
        var br = parseInt(el.css('border-bottom-width'));
        var pl = parseInt(el.css('padding-top'));
        var pr = parseInt(el.css('padding-bottom'));
        var h = height - bl - br - pl - pr;
        el.height(h);
    }
    var HIScroll = function(swElt) {
        var phcount, pheleWidth, phwindowWidth = $(window).width(),
            cols = $(swElt).data("cols"),
            iScrollBody = $(swElt).children(".iscroll"),
            items = iScrollBody.children(),
            hxcount = items.length,
            itemMargin = parseInt($(items).css("margin-right")),
            eleWidth = (phwindowWidth - itemMargin * (cols + 1)) / cols;
        items.each(function() {
            $(this).width(setBorderBoxWidth(this, eleWidth));
        });
        var wrapperWidth = $(items).innerWidth() * hxcount + hxcount * itemMargin;
        iScrollBody.width(eleWidth * hxcount + (hxcount - 1) * itemMargin);
        var iScroll = new IScroll(swElt, {
            preventDefault: false,
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            snapSpeed: 400,
            snap: "a"
        });
    };
    document.addEventListener('touchmove', function(e) {}, false);
    if (window.jQuery || window.Zepto) {
        (function($) {
            $.fn.iScroll = function(params) {
                return this.each(function() {
                    $(this).data('iscroll', new HIScroll($(this)[0], params));
                });
            }
        })(window.jQuery || window.Zepto)
    }
})();





