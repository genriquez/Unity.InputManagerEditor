/// <reference path="../uime.app.js" />
(function (UIME) {
	"use strict";
	
	UIME.directive("uimeOpenFile", function () {
		return {
			restrict: "E",
			
			scope: {
				caption: "=caption",
				onLoad: "=onload"
			},
			
			template: "<button></button><input type='file' style='display: none' />",
			
			link: function link(scope, element, attrs) {
				var input = element.find("input");
				var button = element.find("button").on("click", function () {
					input[0].click();
				});
				
				button.text(attrs.caption);
				
				input.on("change", function () {
					var reader = new FileReader();
					
					reader.addEventListener("load", function () {
						// On load, invoke callback with contents
						scope.$apply(scope.onLoad.bind(scope, reader.result));
					});
					
					reader.readAsText(input[0].files[0]);
				});
			}
		};
	});
}(UIME));