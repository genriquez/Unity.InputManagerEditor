(function (UIME) {
	"use strict";
	
	// Bindings object is shared across all service instances
	var bindings = null;
	
	UIME.service("controllerBindings", ["$rootScope", "bindingsGenerator", "bindingsFileConverter", function ($rootScope, bindingGenerator, bindingsFileConverter) {
		bindings = bindingsFileConverter.createEmpty();
		
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
				var emptyBinding = bindingGenerator.createEmptyBinding();
				var binding = Object.create(emptyBinding);
				
				// copy any mathcing initial values to the new binding
				if (initialValues) {
					for (var property in initialValues) {
						if (emptyBinding.hasOwnProperty(property)) {
							binding[property] = initialValues[property];
						}		
					}
				}
				
				bindings.parsedObject.InputManager.m_Axes.push(binding);
				$rootScope.$broadcast(self.RefreshBindingsEvent);
			},
			
			addBindings: function (bindings) {
				bindings.forEach(function (binding) {
					self.addBinding(binding);	
				});
			}
		};
		
		return self;
	}]);
}(UIME));