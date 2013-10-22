define(["jQuery", "kendo", "utils", "data/projectstListData"], function
        ($, kendo, utils, projectstListData) {
    var currentPage = 1;
    var pageSize = 3;
    var viewModel = kendo.observable({
        myProjectListViewTemplatesInit: function() {
            var dataSource = projectstListData.projectList;

            $("#myProjectCustomListView").kendoMobileListView({
                dataSource: dataSource,
                template: $("#myProjectCustomListViewTemplate").html(),
                filterable: {
                    field: "ProjectName",
                    operator: "contains"

                },
            });


        },
        showActionSheet: function() {
            $('.actionSheetWrapper').toggle();
        },
        show: function() {

            $('#projectsView .selectListProject').unbind();
            $('#projectsView .selectListProject').bind("click", function() {
                $(this).toggleClass('active');
                $('[data-identifier="myProjectCustomListView"]').toggleClass('edit');
                $('[data-identifier="myProjectCustomListView"] li [type="checkbox"]:checked').click();
            });
            $('#projectsView .action-more').unbind();

            $('#projectsView .action-more').bind("click", function() {
                $(this).closest('.ActionBar').find('.actionSheetWrapper').slideToggle();
                $('.overlay').fadeToggle();
                return false;
            });
            $('.overlay').fadeOut();
            $('.navButton.tasks').removeClass('active');
            $('.navButton.projects').addClass('active');
        },
        textChanged: function() {

            alert("Text changed");
        },
        hide: function() {
            $('.selectListProject').removeClass('active');
            $('[data-identifier="myProjectCustomListView"]').removeClass('edit');
            $('[data-identifier="myProjectCustomListView"] li [type="checkbox"]:checked').click();
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
                           
                        url:  "http://mobile.aurigo.net/api/Module?moduleId=xprojct&jsonParameters={'pagesize':'"+pageSize+"','pagetoget':'"+currentPage+"'}&=",
                        dataType: "json",
                        cache: false,
                    }
                }
            });
            dataSource.fetch(function() {
                var data = this.data();
                console.log(data.length);


            })
          
            $('#projListView div.km-listview-wrapper').replaceWith(' <div id="myProjectCustomListView" data-identifier="myProjectCustomListView"></div>');
          
            $("#myProjectCustomListView").kendoMobileListView({
                dataSource: dataSource,
                template: $("#myProjectCustomListViewTemplate").html(),
                filterable: {
                    field: "ProjectName",
                    operator: "contains"

                },
            });
        }



    })

    return {
        viewModel: viewModel
    };
});