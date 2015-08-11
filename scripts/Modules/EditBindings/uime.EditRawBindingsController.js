(function (UIME) {
	"use strict";
	
	function BindingField(field, name, fieldType, modelParser, bindingFormatter) {
		this.field = field;
		this.name = name;
		this.fieldType = fieldType;
		this.converter = { model: modelParser, binding: bindingFormatter };
	}
	
	UIME.controller("EditRawBindingsController", ["$scope", "$attrs", "controllerBindings", function ($scope, $attrs, controllerBindings) {
		$scope.bindings = [];
		$scope.fields = [
			new BindingField("m_Name", "Id", "text"),
			new BindingField("descriptiveName", "Name", "text"),
			new BindingField("positiveButton", "Button", "text"),
			new BindingField("invert", "Invert", "checkbox", "binary", "boolean"),
			new BindingField("type", "Type", "number"),
			new BindingField("axis", "Axis #", "number"),
			new BindingField("joyNum", "Joystick #", "number")
		];
		
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