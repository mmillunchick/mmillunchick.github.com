/*jslint evil: false, strict: false, undef: true, white: false, onevar:false, browser:true, plusplus:false */
/*global jQuery,window, Cufon:true */

(function($, app){

	var initFolioSort = function() {
		
		// get the action filter option item on page load
		var $filterType = $('#filter-options li.active a').attr('class');

		// get and assign the holder element to the
		// $holder varible for use later
		var $holder = $('.folio');

		// clone all items within the pre-assigned $holder element
		var $data = $holder.clone();

		// attempt to call Quicksand when a filter option
		// item is clicked
		$('#filter-options li a').click(function(e) {

			// reset the active class on all the buttons
			$('#filter-options li').removeClass('active');

			// assign the class of the clicked filter option
			// element to our $filterType variable
			var $filterType = $(this).attr('class');
			$(this).parent().addClass('active');
		
			if ($filterType == 'all') {
				// assign all li items to the $filteredData var when
				// the 'All' filter option is clicked
				var $filteredData = $data.find('li');
			}
			else {
				// find all li elements that have our required $filterType
				// values for the data-type element
				var $filteredData = $data.find('li[data-type=' + $filterType + ']');
			}

			// call quicksand and assign transition parameters
			$holder.quicksand(
				$filteredData, {
					duration: 400,
				}
			);
			return false;
		});
	};
	

	function initLightBox(){
		$(".figure-list a").fancybox({
			'titleShow'     : false
		});
		
		$("a.illustration").fancybox({
			'titleShow'     : false
		});
	}


	$(document).ready(function() {
		initFolioSort();

		// Lightbox overlays
		initLightBox();
	});


}( jQuery, window.Hammy ));