define(["jQuery",
    "kendo",
    "viewModels/login-view",
    "viewModels/dashboard-view",
    "viewModels/project-view",
    "viewModels/projectDetails-view",
    "viewModels/task-view",
    "viewModels/myTasksDetails-view",
    "data/projectstListData",
    "utils",
    "config",
    "common"], function(
        $,
        kendo,
        loginView,
        dashboardView,
        projectView,
        projectDetailView,
        taskView,
        myTasksDetailsView,
        projectstList,
        utils,
        config,
        common) {
    var _onError = function(error, url, line) {
    };

    var init = function() {
        window.onerror = _onError;

        var kendoApp = new kendo.mobile.Application(document.body, {
            transition: "slide",
            initial: "loginFormView",
            loading: '<h1 class="loading-message">Loading...</h1>',
            layout: "home-layout",
            platform: "android"

        });
        utils.init(kendoApp);
    };

    return {
        loginView: loginView,
        dashboardView: dashboardView,
        projectView: projectView,
        projectDetailView: projectDetailView,
        taskView:taskView,
        myTasksDetailsView:myTasksDetailsView,
        utils: utils,
        common: common,
        taskView: taskView,
        init: init
    };
});
