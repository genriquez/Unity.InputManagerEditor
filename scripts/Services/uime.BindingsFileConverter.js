/// <reference path="../uime.app.js" />
/// <reference path="../../libs/js-yaml-3.3.1.js" />

(function (UIME, jsyaml) {
	"use strict";

	// Class representing a parsed YAML document
	function YamlConvertedObject(header, parsedObject) {
		this.header = header;
		this.parsedObject = parsedObject;
	}
	
	UIME.factory("bindingsFileConverter", function () {
		return {
			parse: function (yamlText) {
				var lines = yamlText.split("\n"),
					strippedYamlText = null,
					parsedObj = null,
					headerText = "",
					i = 0;
				
				while (lines[i].indexOf("%") === 0 || lines[i].indexOf("-") === 0) {
					headerText += lines[i] + "\n";
					i++;
				}
				
				strippedYamlText = lines.slice(i).join("\n");
				parsedObj = jsyaml.load(strippedYamlText);
				
				return new YamlConvertedObject(headerText, parsedObj);
			},
			
			convert: function (obj) {
				var header = "";
				
				// Unwrap the parsed object
				if (obj instanceof YamlConvertedObject) {
					header = obj.header;
					obj = obj.parsedObject;	
				}
				
				var yamlText = jsyaml.dump(obj);
				yamlText = yamlText.replace(/\:\snull/g, ": ");
				
				return header + yamlText;
			},
			
			createEmpty: function () {
				return new YamlConvertedObject("%YAML 1.1\n%TAG !u! tag:unity3d.com,2011:\n--- !u!13 &1\n", {
					InputManager: {
						m_ObjectHideFlags: 0,
  						serializedVersion: 2,
  						m_Axes: []
					}
				});
			}
		};
	});
}(UIME, jsyaml))