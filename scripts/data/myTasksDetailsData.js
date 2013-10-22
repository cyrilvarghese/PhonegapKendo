define(["jQuery", "kendo", "config", "utils"], function($, kendo, config, utils) {

    return {
        
    	getmyTasksDetailsActionLinks: function(){
    		console.log("test my tasks details action bar");
    		var dataSource = new kendo.data.DataSource({
    			  data: [
    			         	{"Guid":"8b4ee691-1eac-4572-b854-10d05d1fe72e","ActionId":"RouteTo","ActionName":"Acknowledge"},
    			         	{"Guid":"8b4ee691-1eac-4572-b854-10d05d1fe72e","ActionId":"IEBe98bee556acc4fe38ed3552810c5ea29","ActionName":"Submit"} 
    			  ],
    			  change: function() {
    				  //myTasksDetailsActionBarToolTemplate
    				  //myTasksDetailsActionBarLinks
    				  var myTaskDetailstemplate = kendo.template($("#myTasksDetailsActionBarToolTemplate").html());
                      $("#myTasksDetailsActionBarLinks").html(kendo.render(myTaskDetailstemplate, this.view()));
                  }
    			});
    		dataSource.read();
    		
    	},
    	
    	getMyTasksDetailsData: function(){
        	var dataSource = new kendo.data.DataSource({
                /*transport: {
                    read: {
                        url: "http://wbcms.aurigo.net/api/Module?moduleId=xprojct&id="+id+"&jsonFilterAndFields={}&=",
                        dataType: "json",
                        cache: false
                    }
                },
                schema: {
                    data: function(response) {
                    	console.log([response]);
                      return [response];
                    }
                },
                requestStart: function() {
                	utils.showLoading();
                },
                requestEnd: function() {
                	utils.hideLoading();
                },
                change: function() {
                    $("#"+divContentId).html(kendo.render(template, this.view()));
                }*/
        		data: 	
        				[
        		       		{"XPROJCT":{"ProjectID":"2","ProjectCode":"SAMPROJ","ProjectName":"Sample Project","Description":"Description will follow","CreateDate":"1/1/2013 12:00:00"}} 
			         	],
			         	
			         	change: function() {
						  //myTaskDetailsActionBarToolTemplate
						  //myTaskDetailsActionBarLinks
						  var myTaskDetailsDatatemplate = kendo.template($("#myTasksDetailsDataTemplate").html());
		                  $("#myTasksDetailsDataView").html(kendo.render(myTaskDetailsDatatemplate, this.view()));
		              }
            });

            dataSource.read();
    	},
    	
    	updateMyTasksDetailsActions: function(actionId){
        	console.log("Inside my updateMyTasksDetailsActions-->"+ actionId);
        	//utils.navigate("views/tasksView.html");
        }
    };
});