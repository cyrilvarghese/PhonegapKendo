define([], function() {
			var _kendoApp;

			return {
				init : function(kendoApp) {
					_kendoApp = kendoApp;
				},
				showLoading : function(message) {
					$(".loading-message")
							.text(message ? message : "Loading...");
					_kendoApp.showLoading();
				},

				hideLoading : function() {
					_kendoApp.hideLoading();
				},

				showError : function(message, error) {
					var errorMessage = message
							+ (error === undefined ? "" : "\n" + error.status
									+ ": " + error.statusText);
					$("#error-view .message").text(errorMessage);
					$("#error-view").show().data().kendoMobileModalView.open();
				},

				closeError : function() {
					$("#error-view").data().kendoMobileModalView.close();
				},
                                navigate: function (location) {
                                    _kendoApp.navigate(location);
                                }
			};
		});