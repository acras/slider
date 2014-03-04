/*! jQuery AnySlider 1.7.0 | Copyright 2014 Jonathan Wilsson and contributors */

;(function ($) {
	'use strict';

	var Anyslider = function (slider) {
		var slides = slider.children(),
			orgNumSlides = slides.length,
			numSlides = orgNumSlides,
			width = slider.width(),
			next = 0,
			current = 0,
			inner

		// Animation complete callback
		function animationCallback() {
			current = next;

			if (next === 0) {
				current = orgNumSlides;

				inner.css('left', -current * width);

			} else if (next === numSlides - 1) {
				current = 1;

				inner.css('left', -width);
			}

		}

		// The main animation function
		function run() {
            inner.animate({'left': -next * width}, 400, 'swing', animationCallback);
		}

		// Setup the slides
		if (orgNumSlides > 1) {
			slides.eq(0).clone().addClass('clone').appendTo(slider);
			slides.eq(numSlides - 1).clone().addClass('clone').prependTo(slider);
		}

		slides = slider.children();
		numSlides = slides.length;

		// CSS setup
		slides.wrapAll('<div class="as-slide-inner" />').css('width', width);
		inner = slider.css('overflow', 'hidden').find('.as-slide-inner');

			slides.css({
				'float': 'left',
				'position': 'relative'
			});

			inner.css({
				'left': -current * width,
				'width': numSlides * width
			});

		inner.css({
			'float': 'left',
			'position': 'relative'
		});

		// Add the arrows
		if (orgNumSlides > 1) {
			slider.prepend('<a href="#" class="as-prev-arrow" title="LABEL">LABEL</a>'.replace(/LABEL/g, '...ant   '));
			slider.append('<a href="#" class="as-next-arrow" title="LABEL">LABEL</a>'.replace(/LABEL/g, '   prox...'));

			slider.delegate('.as-prev-arrow, .as-next-arrow', 'click', function (e) {
				e.preventDefault();

				next = current + 1;
				if ($(this).hasClass('as-prev-arrow')) {
					next = current - 1;
				}

				run();
			});
		}
	};

	$.fn.AnySlider = function () {
		return this.each(function () {
			var slider = $(this);
            var anyslider;

			// Bail if we already have a plugin instance for this element
			if (slider.data('anyslider')) {
				return slider.data('anyslider');
			}

			anyslider = new Anyslider(slider);

			slider.data('anyslider', anyslider);
		});
	};
}(jQuery));
