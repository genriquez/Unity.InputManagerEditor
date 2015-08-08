/// <reference path="../../uime.app.js" />

(function (UIME) {
	"use strict";
	
	UIME.controller("SelectSourceController", ["$scope", "yamlConverter", function ($scope, yamlConverter) {
		$scope.source = "test";
		
		$scope.onSourceLoad = function (source) {
			var parsed = yamlConverter.parse(source);
			
			$scope.source = JSON.stringify(parsed.parsedObject);
		};
	}]);
}(UIME));