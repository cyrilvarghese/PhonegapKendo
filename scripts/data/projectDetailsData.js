define(["jQuery", "kendo", "config", "utils"], function($, kendo, config, utils) {

    return {
        
    	getProjectDetailsActionLinks: function(){
    		console.log("test project details action bar links");
    		var dataSource = new kendo.data.DataSource({
    			  data: [
    			         	{"Guid":"8b4ee691-1eac-4572-b854-10d05d1fe72e","ActionId":"RouteTo","ActionName":"RouteTo"},
    			         	{"Guid":"8b4ee691-1eac-4572-b854-10d05d1fe72e","ActionId":"IEBe98bee556acc4fe38ed3552810c5ea29","ActionName":"Respond"} 
    			  ],
    			  change: function() {
    				  //projectDetailsActionBarToolTemplate
    				  //projectDetailsActionBarLinks
    				  var projectDetailstemplate = kendo.template($("#projectDetailsActionBarToolTemplate").html());
                      $("#projectDetailsActionBarLinks").html(kendo.render(projectDetailstemplate, this.view()));
                  }
    			});
    		dataSource.read();
    		
    	},
    	
        getprojectDetail: function(id, template, divContentId){
        	console.log("Project Id to get project details ->"+ id);
        	var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://mobile.aurigo.net/api/Module?moduleId=xprojct&id="+id+"&jsonParameters={}&=",
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
                }
            });

            dataSource.read();
        /*	var projectData = new kendo.data.DataSource({
        		transport: {
                    read: {
                        url: "http://mobile.aurigo.net/api/Module?moduleId=xprojct&id="+id+"&jsonParameters={}&=",
                    	//url: "http://127.0.0.1/api/index.php",
                    	//url: "http://mobile.aurigo.net/api/Module?moduleId=xprojct&jsonParameters={}&=&=",
                        dataType: "json",
                        cache: false
                    }
                },
                schema: {
                    data: function(response) {
                    	console.log([response]);
                      return [response];
                    },
                    errors: "error"
                  },
                  error: function(e) {
                	  utils.hideLoading();
                	  alert("bad request");
                    console.log(e.errors); // displays "Invalid query"
                  }
        	 });
        	return projectData;*/
        	 
        },
    	/*projectData: new kendo.data.DataSource({
             transport: {
                 read: {
                	 url: "http://mobile.aurigo.net/api/Module?moduleId=xprojct&id=2&jsonParameters={}&=",
                     dataType: "json",
                     cache: false
                 }
             },
             schema: {
                 data: function(response) {
                 	console.log(response.XPROJCT);
                   return response.XPROJCT.ProjectModules.Row;
                 }
               }
             
         })*/
        updateProjectDetailsActions: function(actionId){
        	console.log("Inside my updateProjectDetailsActions-->"+ actionId);
        }
    };
});