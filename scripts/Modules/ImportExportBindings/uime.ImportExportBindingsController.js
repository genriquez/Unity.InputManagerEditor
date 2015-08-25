/// <reference path="../../uime.app.js" />

(function (UIME, context) {
	"use strict";
	
	UIME.controller("ImportExportBindingsController", ["$scope", "bindingsFileConverter", "controllerBindings", function ($scope, yamlConverter, controllerBindings) {
		$scope.source = "test";
		
		$scope.onSourceLoad = function (source) {
			var parsed = yamlConverter.parse(source);
			controllerBindings.refreshBindings(parsed);
		};
		
		$scope.exportBindings = function () {
			var bindings = controllerBindings.getRawBindings();
			var yaml = yamlConverter.convert(bindings);
			
			// TODO: Remove from controller
			var element = document.createElement("a");
			element.download = "InputManager.asset";
			element.href = "data:application/octet-stream;base64," + btoa(yaml);
			element.click();
		};
	}]);
}(UIME, this));