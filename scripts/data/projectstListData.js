define(["jQuery", "kendo", "config", "utils"], function($, kendo, config, utils) {

    return {
        
        projectList: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://mobile.aurigo.net/api/Module?moduleId=xprojct&jsonParameters={}&=&=",
                    dataType: "json",
                    cache: false
                }
            }
            
            
        })
        
       
    };
});