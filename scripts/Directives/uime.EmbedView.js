/// <reference path="../uime.app.js" />
(function (UIME) {
	"use strict";
	
	UIME.directive("uimeEmbedView", ["$compile", function ($compile) {
		return {
			restrict: "A",
			link: function (scope, $element, $attrs) {
				var view = document.querySelector($attrs.uimeEmbedView).innerHTML;
				$element.html(view);
				$compile($element.contents())(scope);
			}
		};
	}]);
}(UIME, document));