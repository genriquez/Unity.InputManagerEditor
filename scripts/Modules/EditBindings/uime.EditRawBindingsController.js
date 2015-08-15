(function (UIME) {
	"use strict";
	
	function BindingField(field, name, fieldType, modelParser, bindingFormatter) {
		this.field = field;
		this.name = name;
		this.fieldType = fieldType;
		this.converter = { model: modelParser, binding: bindingFormatter };
	}
	
	UIME.controller("EditRawBindingsController", ["$scope", "$attrs", "controllerBindings", function ($scope, $attrs, controllerBindings) {
		$scope.sortField = null;
		$scope.sortOrder = 1; /* 1 default, -1 reverse */
		
		$scope.bindings = [];
		$scope.fields = [
			new BindingField("m_Name", "Id", "text"),
			new BindingField("descriptiveName", "Name", "text"),
			new BindingField("joyNum", "Joy #", "number"),
			new BindingField("type", "Type", "number"),
			new BindingField("axis", "Axis #", "number"),
			new BindingField("invert", "Invert", "checkbox", "binary", "boolean"),
			new BindingField("positiveButton", "Button", "text"),
			new BindingField("gravity", "Gravity", "number"),
			new BindingField("dead", "Deadzone", "number"),
			new BindingField("sensitivity", "Sensitivity", "number")
		];
		
		$scope.sort = function (field) {
			if (field === $scope.sortField) {
				$scope.sortOrder *= -1;
			} else {
				$scope.sortField = field;
				$scope.sortOrder = 1;
			}
			
			controllerBindings.sortBindings($scope.sortField, $scope.sortOrder === -1);
		};
		
		$scope.removeBinding = function (binding) {
			controllerBindings.removeBinding(binding);
		};
		
		$scope.addBindings = function (count) {
			for (var i = 0; i < count; i++) {
				controllerBindings.addBinding();
			}
		};
		
		$scope.$on(controllerBindings.RefreshBindingsEvent, loadBindings);
		
		// Initialization
		loadBindings();
		
		// Function declarations
		function loadBindings () {
			var parsedBindings = controllerBindings.getBindings();
			
			if (parsedBindings) {
				$scope.bindings = parsedBindings.InputManager.m_Axes;
			}
		}
	}]);
}(UIME));