/// <reference path="../uime.app.js" />
(function (UIME) {
	"use strict";
	
	UIME.directive("uimeDialog", ["$rootScope", function ($rootScope) {
		return {
			restrict: "E",
			scope: {
				viewName: "@",
				visible: "=",
				height: "@",
				width: "@"
			},
			template: "<div class='uime-dialog-backdrop' ng-if='visible'>" + 
					  	"<div class='uime-dialog' ng-style='{ width: width, height: height }'>" + 
							"<div class='uime-dialog-contents' uime-embed-view='{{viewName}}'></div>" +
						  	"<button class='btn btn-soft-red uime-dialog-close' ng-click='close()'>X</button>" + 
						"</div>" + 
					  "</div>",
			link: function (scope) {
				scope.close = function () {
					scope.visible = false;
				}
			}
		};
	}]);
}(UIME));