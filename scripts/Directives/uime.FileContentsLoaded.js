/// <reference path="../uime.app.js" />
(function (UIME) {
	"use strict";
	
	UIME.directive("uimeFileContentsLoaded", function () {
		return {
			restrict: "A",
			scope: {
				onLoad: "=uimeFileContentsLoaded"
			},
			link: function link(scope, element, attrs) {
				element.on("change", function () {
					var reader = new FileReader();
					
					reader.addEventListener("load", function () {
						// On load, invoke callback with contents
						scope.$apply(scope.onLoad.bind(scope, reader.result));
					});
					
					reader.readAsText(element[0].files[0]);
				});
			}
		};
	});
}(UIME));