(function (UIME) {
	"use strict";
	
	UIME.controller("ScriptAddBindingsController", ["$scope", "bindingsGenerator", "controllerBindings", function ($scope, bindingsGenerator, controllerBindings) {
		$scope.script = "generator\n" +
						".WithJoyRange()" +
						".WithButtonRange(1,10)\n" +
						".SetName(\"Joy{joyNum}_Button{button}\")\n" +
						".Generate()\n" +
						"\n" +
						"generator\n" +
						".WithJoyRange()\n" +
						".WithAxisRange(1,5)\n" +
						".SetName(\"Joy{joyNum}_Axis{axis}\")\n" +
						".SetGravity(1)\n" +
						".SetDeadzone(0.01)\n" +
						".SetSensitivity(1)\n" +
						".SetInverted(0)\n" +
						".Generate()\n";
		
		$scope.generate = function () {
			var generatedBindings = bindingsGenerator.parse($scope.script);
			controllerBindings.addBindings(generatedBindings);
		};
	}]);
}(UIME));