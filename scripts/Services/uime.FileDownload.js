/// <reference path="../uime.app.js" />

(function (UIME) {
	"use strict";
	
	var downloadMethods = [
		{	// Chrome and Firefox (at least) anchor download attribute method
			test: function () {
				return "download" in document.createElement("A");
			},
			
			run: function (content, filename) {
				var element = document.createElement("a");
				element.download = filename;
				element.href = "data:application/octet-stream;base64," + btoa(content);
				
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			}
		},
		{	// IE and Edge blob download method
			test: function () {
				return !!window.navigator.msSaveBlob;
			},
			
			run: function (content, filename) {
				var blobObject = new Blob([content]); 
				window.navigator.msSaveBlob(blobObject, filename);
			}
		},
		{	// Default output to separate window
			test: function () {
				return true;
			},
			
			run: function (content) {
				var wnd = window.open();
				wnd.document.write("<pre>" + content + "</pre>");
			}
		}
	];
	
	UIME.factory("fileDownload", function () {
		return {
			download: function (content, filename) {
				for(var i = 0; i < downloadMethods.length; i++) {
					var method = downloadMethods[i];
					
					if (method.test()) {
						method.run(content, filename);
						return;
					}
				}
			}
		};
	});
}(UIME))