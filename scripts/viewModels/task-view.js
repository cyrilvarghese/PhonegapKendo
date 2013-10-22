define(["jQuery", "kendo", "utils", "data/taskListData"], function
        ($, kendo, utils, taskListData) {
    var currentPage = 1;
    var pageSize = 3;
    var viewModel = kendo.observable({
        myTaskListViewTemplatesInit: function() {

            var dataSource = taskListData.taskList;
            dataSource.group({field: "ModuleName"});
            $("#myTaskCustomListView").kendoMobileListView({
                dataSource: dataSource,
                template: $("#myTaskListViewTemplate").html(),
                headerTemplate: "<h4>${value}</h4>",
                filterable: {
                    field: "ProjectName",
                    operator: "contains"

                }
            });
        },
        show: function() {
            $('#taskView .selectListProject').unbind();
            $('#taskView .selectListProject').bind("click", function() {

                $(this).toggleClass('active');
                $('[data-identifier="myTaskCustomListView"]').toggleClass('edit');
                $('[data-identifier="myTaskCustomListView"] li [type="checkbox"]:checked').click();

            });
            $('#taskView .action-more').unbind();
            $('#taskView .action-more').bind("click", function() {
                $(this).closest('.ActionBar').find('.actionSheetWrapper').slideToggle();
                $('.overlay').fadeToggle();
                return false;
            });

            $('.overlay').fadeOut();
            $('.navButton.tasks').addClass('active');
            $('.navButton.projects').removeClass('active');


        },
        hide: function() {
            $('.selectListProject').removeClass('active');
            $('[data-identifier="myTaskCustomListView"]').removeClass('edit');
            $('[data-identifier="myTaskCustomListView"] li [type="checkbox"]:checked').click();
        },
        triggerActionBar: function(id) {
            /*  $this = $('#myTaskCustomListView [type="checkbox"]#checkbox_' + id);
             if ($this.is(':checked')) {
             $this.closest('li').addClass('active');
             } else {
             $this.closest('li').removeClass('active');
             }
             */

            actionBar = false;
            selectedIndex = '';
            $('#myTaskCustomListView li [type="checkbox"]').each(function() {
                if ($(this).is(':checked')) {
                    actionBar = true;
                }

                if ($(this).is(':checked')) {

                    /** To append clicked checkbox value to call workflow-action api for the my task record */
                    if (selectedIndex) {
                        selectedIndex += "," + $(this).attr("id") + ";PID:" + $(this).attr("data-PID") + ";ParentID:" + $(this).attr("data-ParentID") + ";data-FormInstanceID:" + $(this).attr("data-FormInstanceID") + ";data-FormID:" + $(this).attr("data-FormID");
                    } else {
                        selectedIndex = $(this).attr("id") + ";PID:" + $(this).attr("data-PID") + ";ParentID:" + $(this).attr("data-ParentID") + ";data-FormInstanceID:" + $(this).attr("data-FormInstanceID") + ";data-FormID:" + $(this).attr("data-FormID");
                    }

                    $(this).closest('li').addClass('active');
                } else {
                    $(this).closest('li').removeClass('active');
                }
            });
            //console.log("Checked checkbox value=>"+ selectedIndex);
            if (selectedIndex) {
                //localStorage.setItem("selectedTaskItemValue",selectedIndex);
                var template = kendo.template($("#myTaskActionBarToolTemplate").html());
                var divContentId = "myTaskActionBarLinks";
                taskListData.workflowAction(selectedIndex, template, divContentId);
                /*$("#myTaskActionBarLinks").kendoMobileListView({
                 dataSource: myTaskActionBarSource,
                 template: $("#myTaskActionBarToolTemplate").html(),
                 });*/

                if (actionBar == true)
                    $('#ActionBar').removeClass('noneElement');
            } else {
                console.log("No selected index");
                $('#ActionBar').addClass('noneElement');
                $('.actionSheetWrapper').fadeOut();
                $('.overlay').fadeOut();
                // localStorage.removeItem("selectedTaskItemValue");
            }

            /* if (actionBar == true) {
             
             
             } else {
             
             
             
             }*/
        },
        triggermyTasksListActionLink: function(actionId) {
            console.log("Action Id==>" + actionId);
            //console.log(localStorage.getItem("selectedTaskItemValue"));

            var selectedIndex = '';
            $("#myTaskCustomListView input:checked").each(function() {
                if (selectedIndex) {
                    selectedIndex += "," + $(this).attr("data-formid");
                } else {
                    selectedIndex = $(this).attr("data-formid");
                }
            });
            console.log(selectedIndex);

            if (selectedIndex) {
                alert("You have selected " + selectedIndex);
                if (actionId.indexOf("Submit_") > -1) {
                    console.log("Clicked Submit link");
                    taskListData.updateMyTasksListActions(actionId);
                } else if (actionId.indexOf("RouteTo_") > -1) {
                    console.log("Clicked Route to link");
                }
            } else {
                alert("Please at least one of the checkbox");
            }
        },
        getNextPage: function() {
            currentPage = currentPage + 1;
            viewModel.loadListView();

        }
        ,
        getLastPage: function() {
            if (currentPage > 1) {
                currentPage = currentPage - 1;
                viewModel.loadListView();
            }
        }
        , loadListView: function() {

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        
                        url: "http://mobile.aurigo.net/api/Tasks?jsonParameters={'pagesize':'" + pageSize + "','pagetoget':'"+ currentPage+"'}&=",
                        dataType: "json",
                        cache: false,
                    }
                }
            });
            dataSource.fetch(function() {
                var data = this.data();
                console.log(data.length);


            })
            dataSource.group({field: "ModuleName"});
            $('#taskListView div.km-listview-wrapper').replaceWith(' <div id="myTaskCustomListView" data-identifier="myTaskCustomListView"></div>');

            $("#myTaskCustomListView").kendoMobileListView({
                dataSource: dataSource,
                template: $("#myTaskListViewTemplate").html(),
                headerTemplate: "<h4>${value}</h4>",
                filterable: {
                    field: "ProjectName",
                    operator: "contains"

                }
            });
        }



    });
    return {
        viewModel: viewModel
    };
});