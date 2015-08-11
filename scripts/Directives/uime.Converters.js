/// <reference path="../uime.app.js" />
(function (UIME) {
	"use strict";
	
	var converters = {
		"binary": function (input) {
			return input ? 1 : 0;
		},
		
		"boolean": function (input) {
			return input ? true : false;
		},
		
		"number": function (input) {
			return parseInt(input);
		},
		
		"text": function (input) {
			return input.toString();
		}
	};
	
	UIME.directive("uimeConverter", function ($compile) {
		return {
			restrict: "A",
			scope: {
				settings: "=uimeConverter"
			},
			require: 'ngModel',
			link: function (scope, $element, $attrs, ngModel) {
				var parserName = scope.settings.model;
				var formatterName = scope.settings.binding;
				
				if (parserName && converters[parserName]) {
					ngModel.$parsers.push(converters[parserName]);
				}
				
				if (formatterName && converters[formatterName]) {
					ngModel.$formatters.push(converters[formatterName]);
				}
			}
		};
	});
}(UIME));