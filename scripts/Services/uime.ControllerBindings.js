(function (UIME) {
	"use strict";
	
	// Bindings object is shared across all service instances
	var bindings = null;
	
	UIME.service("controllerBindings", ["$rootScope", function ($rootScope) {
		var self = {
			RefreshBindingsEvent: "controllerBindingsRefresh",
			
			getRawBindings: function () {
				return bindings;
			},
			
			getBindings: function () {
				return bindings && bindings.parsedObject;	
			},
			
			refreshBindings: function (newBindings) {
				bindings = newBindings;
				$rootScope.$broadcast(self.RefreshBindingsEvent);
			}
		};
		
		return self;
	}]);
}(UIME));