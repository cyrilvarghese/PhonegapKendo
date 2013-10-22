define(["jQuery", "kendo", "utils", "data/myTasksDetailsData"], function
        ($, kendo, utils, myTasksDetailsData) {
	
	var viewModel = kendo.observable({
		getmyTasksDetailsParamDetails: function(e){
			myTasksDetailsData.getMyTasksDetailsData();
			
			myTasksDetailsData.getmyTasksDetailsActionLinks();
        },
        
        triggerMyTasksDetailsActionLink: function(action){
        	console.log("My Tasks Details Action ==>"+ action);
        	myTasksDetailsData.updateMyTasksDetailsActions(action);
        }
	});
	
	 return {
	        viewModel: viewModel
	    };
});