define(["jQuery", "kendo", "utils"], function($, kendo, utils) {

    var loginViewModel = kendo.observable({
        authserver: "http://mobile.aurigo.net",
        username: "Akila",
        password: "aurigo",
        getUserDetails: function() {
            utils.showLoading("logging in");
            var authserver = this.get("authserver");
            var username = this.get("username");
            var password = this.get("password");
            var ajaxRequest = $.ajax({
                type: "POST",
                url: authserver + "/api/Login?username=" + username + "&password=" + password + "&c=&Role=" + username,
                dataType: "json",
                cache: false
            });
            ajaxRequest.done(function() {
                utils.hideLoading();
                //alert("Sucessfully logged in");
                utils.navigate("views/projectsView.html");
            });
            ajaxRequest.fail(function(xhr, textStatus, errorThrown) {
                alert("login failed");
                utils.hideLoading();
            });
        },
        init: function() {
         //   alert("view Initialized");


        }
    });
    return {
        viewModel: loginViewModel
    };
});