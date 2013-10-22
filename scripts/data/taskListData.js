define(["jQuery", "kendo", "config", "utils"], function($, kendo, config, utils) {

	return{
        
            taskList: new kendo.data.DataSource({
	            transport: {
	                read: {
	                    url: "http://mobile.aurigo.net/api/Tasks?jsonParameters={'pagesize':'10','pagetoget':'1'}&=",
	                	//url:"http://demos.kendoui.com/service/", //sample url to get error page for testing
	                    dataType: "json",
	                    cache: false,
	                    
	                }
	            }/*,
	            schema: {
	                errors: "error"
	              },
	              error: function(e) {
	            	utils.hideLoading();
	                console.log(e.status);
	              }*/
            }),
        
            workflowAction: function(getParamDetails, template, divContentId){
	        	console.log("Param Details==>"+getParamDetails);
	        	var splitedParam = getParamDetails.split(";");
	        	//console.log(splitedParam);
	        	//var ="";
	        	var PID="";
	        	var ParentID="";
	        	var FormInstanceID="";
	        	var FormID="";
	        	$.each(splitedParam, function(key, value){
	        		//if(value.indexOf(":") > -1){
	        			
	        			if(value.indexOf("PID") > -1){
	        				PIDval = value.split(":");
	        				PID=PIDval[1];
	        				//console.log(PID);
	        			}
	        			if(value.indexOf("ParentID") > -1){
	        				ParentIDval = value.split(":");
	        				ParentID=ParentIDval[1];
	        				//console.log(ParentID);
	        			}
	        			if(value.indexOf("FormInstanceID") > -1){
	        				FormInstanceIDval = value.split(":");
	        				FormInstanceID=FormInstanceIDval[1];
	        				//console.log(FormInstanceID);
	        			}
	        			if(value.indexOf("FormID") > -1){
	        				FormIDval = value.split(":");
	        				FormID=FormIDval[1];
	        				//console.log(FormID);
	        			}
	        		//}
	        	});
	        	var dataSource = new kendo.data.DataSource({
		        	transport: {
		                read: {
		                	//http://mobile.aurigo.net/api/Workflow?moduleId=PCOFORM&forminstanceid=1&jsonParameters={%22pid%22:4,%22parentid%22:4}&=
		                    url: "http://mobile.aurigo.net/api/Workflow?moduleId="+FormID+"&forminstanceid="+FormInstanceID+"&jsonParameters={\"pid\":"+PID+",\"parentid\":"+ParentID+"}&=",
		                    dataType: "json",
		                    cache: false,
		                    
		                }
		            },
		            schema: {
	                    data: function(response) {
	                    	console.log( response);
	                    	return response;
	                    	//return [{"ActionId":"8b4ee691-1eac-4572-b854-10d05d1fe72e_RouteTo","ActionName":"RouteTo"},
	                    	  //      {"ActionId":"8b4ee691-1eac-4572-b854-10d05d1fe72e_IEBe98bee556acc4fe38ed3552810c5ea29","ActionName":"Submit"}];
	                    }
	                },
	                change: function() {
	                	var data = this.view();
	                	//var template1 = kendo.template($("#myTaskActionBarToolTemplate1").html());
	                	console.log("Total action data length-->"+ data.length);
	                    $("#"+divContentId).html(kendo.render(template, this.view()));
	                	//$("#"+divContentId).html(template1(data));
	                }
		        });
	        	dataSource.read();
	        	// return dataSource;
            },
            
            updateMyTasksListActions: function(actionId){
            	console.log("Inside my updateMyTasksListActions-->"+ actionId);
            }
		};
});