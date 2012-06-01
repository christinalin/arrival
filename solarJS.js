

$(document).ready(function(){
	
	$("a").removeAttr('href');
	
	$('a').on('click', function(e){
		e.preventDefault();
		
	});
	
	
	$("body").on("touchstart", function(e){
		e.preventDefault();
		
	});	
	
	$("body").on("touchmove", function(e){
		e.preventDefault();
		
	});	
	
	var current;
	var cur_callout;
	
	// When a row is clicked...
	$(".row").click(function(){
		
		// locate the next element that's hidden
		
		var hiddenRow = $(this).find( '.hidden' )
		
		
		// toggle the row that was hidden
		fadeOut(hiddenRow, 
				hiddenRow, 
				'selected'
				);
		
		// toggle 'tap to close' text
		fadeOut( $('#close_footer'),
				 $('.hidden_footer'),
				 'show_footer'
				 );
			
	});
	
	
	
	
	// fade toggle the given items
	function fadeOut( itemToFade, hiddenClass, newClass ){
		
		itemToFade.fadeToggle(1000, function(){
		
			hiddenClass.toggleClass(newClass,500);
		
		});
		
	};
	
	window.open = null;
	
	//$("a").removeAttr('href');
	
});

