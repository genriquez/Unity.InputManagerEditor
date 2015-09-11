(function (document) {
	"use strict";
	
	// Core
	loadComponent("uime.app");
	
	// Directives
	loadDirective("OpenFile");
	loadDirective("EmbedView");
	loadDirective("Converters");
	loadDirective("Dialog");	
	
	// Services
	loadService("BindingsFileConverter");
	loadService("BindingsGenerator");
	loadService("ControllerBindings");
	loadService("FileDownload");
	
	// Controllers
	loadController("TabsController");
	
	// Modules
	loadModuleComponent("ImportExportBindings", "ImportExportBindingsController");
	loadModuleComponent("EditBindings", "EditRawBindingsController");
	loadModuleComponent("EditBindings", "EditGroupedBindingsController");
	loadModuleComponent("EditBindings", "ScriptAddBindingsController");
	
	// Load functions
	function loadModuleComponent(moduleName, componentName) {
		loadComponent("Modules/" + moduleName + "/uime." + componentName);
	}
	
	function loadController(controllerName) {
		loadComponent("Controllers/uime." + controllerName);
	}
	
	function loadDirective(directiveName) {
		loadComponent("Directives/uime." + directiveName);
	}
	
	function loadService(serviceName) {
		loadComponent("Services/uime." + serviceName);
	}
	
	function loadComponent(jsName) {
		var scriptEl = "<script src=\"scripts/" + jsName + ".js\"></script>";
		document.write(scriptEl);
	}
}(document));