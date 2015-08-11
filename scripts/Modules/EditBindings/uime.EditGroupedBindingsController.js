(function (UIME) {
	"use strict";
	
	UIME.controller("EditGroupedBindingsController", ["$scope", "$attrs", "controllerBindings", function ($scope, $attrs, controllerBindings) {
		$scope.bindings = [];
		$scope.inputTypeIds = [0,1,2];
		$scope.inputTypeNames = ["Button", "Mouse", "Axis"];
		
		$scope.$on(controllerBindings.RefreshBindingsEvent, loadBindings);
		
		loadBindings();
		
		// Function declarations
		function loadBindings () {
			$scope.bindings = [];
			
			var parsedBindings = controllerBindings.getBindings();
			
			if (parsedBindings) { 
				var allBindings = parsedBindings.InputManager.m_Axes;
				allBindings.forEach(function (el) {
					if (el.joyNum == $attrs.joystickGroup) {
						$scope.bindings.push(el);
					}
				});
			}
		}
	}]);
}(UIME));