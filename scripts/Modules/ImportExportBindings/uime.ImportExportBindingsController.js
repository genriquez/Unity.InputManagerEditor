/// <reference path="../../uime.app.js" />

(function (UIME, context) {
	"use strict";
	
	UIME.controller("ImportExportBindingsController", ["$scope", "bindingsFileConverter", "controllerBindings", "fileDownload", function ($scope, yamlConverter, controllerBindings, fileDownload) {
		$scope.source = "test";
		
		$scope.onSourceLoad = function (source) {
			var parsed = yamlConverter.parse(source);
			controllerBindings.refreshBindings(parsed);
		};
		
		$scope.exportBindings = function () {
			var bindings = controllerBindings.getRawBindings();
			var yaml = yamlConverter.convert(bindings);
			
			fileDownload.download(yaml, "InputManager.asset");
		};
	}]);
}(UIME, this));