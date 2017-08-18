/*
 * jQuery imagescrubber Plugin
 * version: 0.1
 * URL: http://github.com/BBB/imagescrubber
 * Description: A mouse movement triggered image slideshow, based upon the jQuery javascript library.
 * Requires: jQuery 1.2.3 (Untested on anything lower; but it'll probably work)
 * Original plugin by: Ollie Relph http://bambambam.co.uk/
 * Improved/Touch support by: Fabian Hijlkema http://fabianhijlkema.nl
 */

(function($) {
	$.fn.imagescrubber = function(settings) {

		return this.each(function() {
      var $parent = $(this).parent();
			var $items = $(this).children(settings.items);
      // debug();
			$(this).css({
				overflow : 'hidden',
				width : settings.width,
				height : settings.height,
				// color : 'grey';
			});

			var eventaxis = settings.axis === 'y' ? 'pageY' : 'pageX';
			var offsetval = settings.axis === 'y' ? 'offsetTop' : 'offsetLeft';
			var dimension = settings.axis === 'y' ? settings.height : settings.width;

			$items.hide()
			// $($items[0]).show()

			var sections = dimension / ($items.length);
			var activesection = 0;
			$items.closest('.project').find('.total').html($items.length);

			var page_x = 0;
			var page_y = 0;

      // var $img = $('img');
      // $img.hide();
      // $('.imagecontainer').mousemove(function(e) {
          // $img.stop(1, 1).fadeIn();
      //     $('img').offset({
      //         top: e.pageY - $img.outerHeight(),
      //         left: e.pageX - ($img.outerWidth() / 10)
      //     });
      // }).mouseleave(function() {
      //     $img.fadeOut();
      // });

			$parent.bind('mousemove touchmove',function(e){
				var offset = $(this).parent().offset();
				if(e.type == 'touchmove'){
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					var page_x_offset = Math.abs(page_x - touch.pageX);
					var page_y_offset = Math.abs(page_y - touch.pageY);
					if(page_x_offset >= page_y_offset && $items.length > 1) {
						e.preventDefault();
					}
					var x = touch.pageX - offset.left;
					if(x < $(this).width() && x > 0){
						//do something
					}
					else {
						return false;
					}
					page_x = touch.pageX;
					page_y = touch.pageY;
				}
				else if(e.type == 'mousemove'){
			    	var x = e[eventaxis] - offset.left;
            // $(this).stop(1, 1).fadeIn();

            $(this).find('img').offset({
              top: e.pageY - 250,
              left: e.pageX - ($(this).outerWidth()/6)
            });

				}

			    var cursection = Math.floor(x / sections);

			    if (x < dimension && activesection !== cursection) {
			        activesection = cursection;
			        $items.hide();
			        // $items.closest('.project').find('.current').html(parseInt(cursection) + 1);
								$($items[cursection]).fadeIn('fast');
			    }

			});
			$(this).parent().mouseleave(function(e){
			        activesection = 0;
			        // $items.hide().fadeOut;
							$items.fadeOut('normal')
			        // $items.closest('.project').find('.current').html(parseInt(activesection) + 1);
			});

		});


	};
})(jQuery);
