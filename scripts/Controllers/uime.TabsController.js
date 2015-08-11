(function (UIME) {
	"use strict";
	
	UIME.controller("TabsController", ["$scope", "$attrs", function ($scope, $attrs) {
		$scope.currentTab = $attrs.defaultTab;
		
		$scope.switchTab = function (tabName) {
			$scope.currentTab = tabName;	
		};
	}]);
}(UIME));