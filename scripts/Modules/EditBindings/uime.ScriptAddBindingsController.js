(function (UIME) {
	"use strict";
	
	UIME.controller("ScriptAddBindingsController", ["$scope", "bindingsGenerator", "controllerBindings", function ($scope, bindingsGenerator, controllerBindings) {
		$scope.script = "";
		
		$scope.generate = function () {
			var generatedBindings = bindingsGenerator.parse($scope.script);
			controllerBindings.addBindings(generatedBindings);
		};
	}]);
}(UIME));