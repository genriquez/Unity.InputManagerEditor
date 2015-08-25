(function (UIME) {
	"use strict";
	
	UIME.controller("EditGroupedBindingsController", ["$scope", "$attrs", "controllerBindings", function ($scope, $attrs, controllerBindings) {
		var joyNumGroup = parseInt($attrs.joystickGroup);
		
		$scope.bindings = [];
		$scope.inputTypeIds = [0,1,2];
		$scope.inputTypeNames = ["Button", "Mouse", "Axis"];
		
		$scope.$on(controllerBindings.RefreshBindingsEvent, loadBindings);
		
		$scope.removeBinding = function (binding) {
			controllerBindings.removeBinding(binding);
		};
		
		$scope.addBindings = function (count) {
			for (var i = 0; i < count; i++) {
				controllerBindings.addBinding({ joyNum: joyNumGroup });
			}
		};
		
		loadBindings();
		
		// Function declarations
		function loadBindings () {
			$scope.bindings = [];
			
			var parsedBindings = controllerBindings.getBindings();
			
			if (parsedBindings) { 
				var allBindings = parsedBindings.InputManager.m_Axes;
				allBindings.forEach(function (el) {
					if (el.joyNum == joyNumGroup) {
						$scope.bindings.push(el);
					}
				});
			}
		}
	}]);
}(UIME));