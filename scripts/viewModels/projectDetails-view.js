define(["jQuery", "kendo", "utils", "data/projectDetailsData" ], function($, kendo, utils, projectDetailsData) {
	 
	var viewModel = kendo.observable({
            projectName:"",
            getParamDetails: function(e){
					//var view = e.view;
					var id = e.view.params.pid;
					viewModel.projectName=e.view.params.pname;
					console.log("Clickable Project Id --> "+id);
					/** Template name */
					var template = kendo.template($("#projectDetailsTemplate").html());
					/** Div to load the template content */
					var divContentId = "projectDetailsListView";
					
					projectDetailsData.getprojectDetail(id, template, divContentId);
					$("#projectDetailViewNavBar").data("kendoMobileNavBar").title(viewModel.projectName);

				//	var projectDetailsSource =  projectDetailsData.getprojectDetail(id);
					//var projectDetailsSource =  projectDetailsData.projectData;
				//	console.log("Project Details Source==>"+projectDetailsSource);
				/*	$("#projectDetailsListView").kendoMobileListView({
		                dataSource: projectDetailsSource,
		                template: $("#projectDetailsTemplate").html(),
		            });                          
                            $("#projectDetailViewNavBar").data("kendoMobileNavBar").title(viewModel.projectName);
                  */
					$(".action-more").unbind();
					$(".action-more").bind( "click",function(){
						$('#ActionBarProjectDetail').find('.actionSheetWrapper').slideToggle();
	                    $('.overlay').fadeToggle();
	                    return false;
					});
					
					projectDetailsData.getProjectDetailsActionLinks();
            },
            
            triggerProjectDetailsActionLink: function(action){
            	console.log("Project Details Action Link ==>"+ action);
            	projectDetailsData.updateProjectDetailsActions(action);
            }
	 });
	return{
		viewModel:viewModel,
		showDrawer: function() {
		    $("#my-drawer").data("kendoMobileDrawer").show();
		},
		hideDrawer: function() {
		    $("#my-drawer").data("kendoMobileDrawer").hide();
		},
		listViewClick: function (e) {
		    console.log(e.item); // The clicked item as a jQuery object
		}
	};
});