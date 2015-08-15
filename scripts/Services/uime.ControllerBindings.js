(function (UIME) {
	"use strict";
	
	// Bindings object is shared across all service instances
	var bindings = null;
	
	var defaultBindingValues = {
		serializedVersion: 3,
      	m_Name: null,
      	descriptiveName: null,
      	descriptiveNegativeName: null,
      	negativeButton: null,
      	positiveButton: null,
      	altNegativeButton: null,
      	altPositiveButton: null,
      	gravity: 0,
      	dead: 0,
      	sensitivity: 1,
      	snap: 0,
      	invert: 0,
      	'type': 2,
      	axis: 0,
      	joyNum: 0
	};
	
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
			},
			
			sortBindings: function (field, reverse) {
				var sortOrder = reverse ? -1 : 1; 
				bindings.parsedObject.InputManager.m_Axes.sort(function (a, b) {
					if (a[field] > b[field]) {
						return sortOrder;
					} else if (a[field] < b[field]) {
						return -sortOrder;
					} else {
						return 0;
					}
				});
				
				$rootScope.$broadcast(self.RefreshBindingsEvent);
			},
			
			removeBinding: function (binding) {
				var index = bindings.parsedObject.InputManager.m_Axes.indexOf(binding);
				bindings.parsedObject.InputManager.m_Axes.splice(index, 1);	
				
				$rootScope.$broadcast(self.RefreshBindingsEvent);
			},
			
			addBinding: function (initialValues) {
				// Create a copy of the binding default values
				var binding = Object.create(defaultBindingValues);
				
				// copy any mathcing initial values to the new binding
				if (initialValues) {
					for (var property in initialValues) {
						if (defaultBindingValues.hasOwnProperty(property)) {
							binding[property] = initialValues[property];
						}		
					}
				}
				
				bindings.parsedObject.InputManager.m_Axes.push(binding);
				$rootScope.$broadcast(self.RefreshBindingsEvent);
			}
		};
		
		return self;
	}]);
}(UIME));