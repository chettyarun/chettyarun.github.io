$(document).ready(function() {

	// Initialize Masonry
	$('#content').masonry({
		columnWidth: 250,
		itemSelector: '.item',
		isFitWidth: true,
	}).imagesLoaded(function() {
		$(this).masonry('reload');
	});

});