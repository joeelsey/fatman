$(function() {
	$( "body>[data-role='panel']" ).panel();
	$(".back-bn").on("click", function(e){
		e.preventDefault();
		console.log("go to back page");
		var previousPage = $.mobile.activePage.data('ui.prevPage');
		$.mobile.changePage(previousPage, 'slide', true, true);
	})
});