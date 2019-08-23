init3D();

function init3D() {
	var $workItem = $(".work__item");

	$workItem.each(function() {
		$(this).data("xPos", $(this).offset().left);
		$(this).data("yPos", $(this).offset().top);
		$(this).data("itemWidth", $(this).width());
		$(this).data("itemHeight", $(this).height());
		$(this).data("imgOuter", $(this).find(".work__item-img-outer"));
	});

	$workItem.mousemove(function(e) {
		var xPos = $(this).data("xPos");
		var yPos = $(this).data("yPos");
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var left = mouseX - xPos;
		var top = mouseY - yPos;
		var origin = "center center -300";
		var xPerc =
			(left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth") * 100;
		var yPerc =
			(top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight") * 100;

		TweenMax.to($(this).data("imgOuter"), 2, {
			rotationX: 0.1 * yPerc,
			rotationY: -0.1 * xPerc,
			transformOrigin: origin,
			ease: Expo.easeOut
		});
	});

	$workItem.on("mouseleave", function() {
		TweenMax.to($(this).data("imgOuter"), 2, {
			rotationX: 0,
			rotationY: 0,
			transformOrigin: origin,
			ease: Expo.easeOut
		});
	});
}