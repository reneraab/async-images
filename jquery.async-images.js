(function($) {
	if (!$) return;
	
	var asyncImages = {
		initManual: function(images) {
			// iterate through the defined images
			$.each(images, function(i, sources) {
				// check if img-Tag exists in DOM -> don't load images if they are not included in the page
				if ($(i).length === 0) return;

				// set src-attribute if not already set
				if (!$(i).attr("src")) $(i).attr("src", sources[Object.keys(sources)[0]]);

				// find the best width and load the image
				imageLoader.loadBestImage(sources, i);
			});
		},
		initAuto: function() {
			// iterate through all img-tags and try to use the data-attributes
			$("img").each(function() {
				// only use images, where there is a data-loader="true" attribute
				if ($(this).data("loader")) {
					// find possible widths
					var sources = {};
					$.each($(this).data(), function(attr, src) {
						if (!isNaN(attr)) sources[attr] = src;
					});
					
					// add the low resolution width (the image which is always loaded)
					sources[$(this).data("lowres")] = $(this).attr("src");
					
					// find the best width and load the image
					imageLoader.loadBestImage(sources, this);
				}
			});
		},
		loadBestImage: function(sources,target) {
			var widths = Object.keys(sources).sort(function(a, b) { return a - b; }).reverse();
			var width = widths[widths.length - 1];
			$.each(widths, function(i, w) {
				if (screen.width <= w) {
					width = w;
				}
			});

			var img = new Image();
			$(img).on("load", function() {
				$(target).attr("src", sources[width]);
			});
			img.src = sources[width];
		}
	};
	
	$.asyncImages = function(images) {
		if (images) {
			asyncImages.initManual(images);
		} else {
			asyncImages.initAuto();
		}
		
	};
}(jQuery));