(function (document) {
	"use strict";
	
	// Core
	loadComponent("uime.app");
	
	// Directives
	loadComponent("Directives/uime.FileContentsLoaded");
	
	// Services
	loadComponent("Services/uime.YamlConverter");
	
	// Modules
	loadComponent("Modules/SelectSource/uime.SelectSourceCtrl");
	
	function loadComponent(jsName) {
		var scriptEl = "<script src=\"scripts/" + jsName + ".js\"></script>";
		document.write(scriptEl);
	}
}(document));