/**
 * Common Jquery functions can be written in this file
 */
define( ["jQuery"], function($) {
		/** To show/hide settings option */
		/*$(".settingsButton").click(function(){
			console.log("Clicked in settings icon");
			$(".submenu").toggle();
			console.log("Clicked Settings icon menu");
		});*/
		
		/** To close the opened settings menu option once we click the list / outside in the body */
		$(document).click(function(e) {
			if(!$('#settingsButton').find(e.target).length){
				$("#settingsMenuOption").hide();
				console.log("Clicking outside settings icon");
			}
		});
	$(function(){
	    $("#settingsButton").click(function(){
	      console.log("settingsButton got a click");
	      $("#settingsMenuOption").toggle();
		  console.log("Clicked Settings icon menu");
	    });
	  });
});