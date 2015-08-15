(function (UIME) {
    'use strict';

    var emptyBinding = {
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
        type: 0,
        axis: 0,
        joyNum: 0
    };
    
    function parseTemplate(template, context) {
        var parts = template.split(/(\{[^\}]*\})/);
    
        var text = "";
        parts.forEach(function (part, i) {
            if (part.indexOf("{") === 0 && part.lastIndexOf("}") === part.length - 1) {
                text += context[part.replace(/[{}]/g,"")];
            } else {
                text += part;
            }
        });
    
        return text;
    }
    
    function BindingGenerator() {
        this.steps = [];
        this.generatedBindings = [];
    }
    
    BindingGenerator.createEmptyBinding = function () {
        return Object.create(emptyBinding);
    };
    
    BindingGenerator.prototype.ForJoyRange = function (from, to) {
        from = from === undefined ? 1 : from;
        to = to === undefined ? 4 : to;
        
        this.steps.push(function (baseBindings) {
            var bindings = [];
        
            for (var i = from; i <= to; i++)
            for (var j = 0; j < baseBindings.length; j++) {
                var binding = Object.create(baseBindings[j]);
                binding.joyNum = i;
                binding.type = 2;
    
                bindings.push(binding);
            }
    
    
            return bindings;
        });
        
        return this;
    };
    
    BindingGenerator.prototype.ForButtonRange = function (from, to) {
        from = from || 0;
        to = to || 0;
        
        this.steps.push(function (baseBindings) {
            var bindings = [];
        
            for (var i = from; i <= to; i++)
            for (var j = 0; j < baseBindings.length; j++) {
                var binding = Object.create(baseBindings[j]);
                binding.positiveButton = parseTemplate("joystick {j} button {b}", { j: binding.joyNum, b: i });
                binding.button = i;
                binding.type = 0;
                
                bindings.push(binding);
            }
    
            return bindings;
        });
        
        return this;
    };
    
    
    BindingGenerator.prototype.ForAxisRange = function (from, to) {
        from = from || 0;
        to = to || 0;
        
        this.steps.push(function (baseBindings) {
            var bindings = [];
        
            for (var i = from; i <= to; i++)
            for (var j = 0; j < baseBindings.length; j++) {
                var binding = Object.create(baseBindings[j]);
                binding.axis = i;
    
                bindings.push(binding);
            }
    
            return bindings;
        });
        
        return this;
    };
    
    BindingGenerator.prototype.WithPropertyValue = function (property, value){
        this.steps.push(function (baseBindings) {
            var bindings = [];
        
            for (var j = 0; j < baseBindings.length; j++) {
                var binding = Object.create(baseBindings[j]);
                binding[property] = value;
        
                bindings.push(binding);
            }
        
            return bindings;
        });
        
        return this;
    };
    
    BindingGenerator.prototype.WithPropertyTemplate = function (property, template) {
        this.steps.push(function (baseBindings) {
            var bindings = [];
        
            for (var j = 0; j < baseBindings.length; j++) {
                var binding = Object.create(baseBindings[j]);
                binding[property] = parseTemplate(template, binding);
        
                bindings.push(binding);
            }
        
            return bindings;
        });
        
        return this;
    };
    
    BindingGenerator.prototype.WithName = function (template) {
        return this.WithPropertyTemplate("m_Name", template);
    };
    
    BindingGenerator.prototype.WithDescriptiveName = function (template) {
        return this.WithPropertyTemplate("descriptiveName", template);
    };
    
    BindingGenerator.prototype.WithGravity = function (value) {
        return this.WithPropertyValue("gravity", parseInt(value));
    };
    
    BindingGenerator.prototype.WithDeadzone = function (value) { 
        return this.WithPropertyValue("dead", parseFloat(value));
    };
    
    BindingGenerator.prototype.WithSensitivity = function (value) { 
        return this.WithPropertyValue("sensitivity", parseFloat(value));
    };
    
    BindingGenerator.prototype.WithInverted = function (value) {
        return this.WithPropertyValue("invert", parseInt(value));  
    };
    
    BindingGenerator.prototype.Conditional = function (predicate) {
        var lastStep = this.steps.splice(this.steps.length - 1, 1)[0];
        
        this.steps.push(function (baseBindings) {
            var bindings = [];
            
            baseBindings.forEach(function (binding, i) {
                if (predicate(binding)) {
                    bindings = bindings.concat(lastStep([binding]));     
                } else {
                    bindings.push(binding);
                }
            });
            
            return bindings;
        });   
        
        return this;
    };  
    
    BindingGenerator.prototype.ConditionalMatch = function (property, value) {
        var values = value instanceof Array ? value : [value];
    
        return this.Conditional(function (binding) {
            return values.indexOf(binding[property]) >= 0;
        });
    };
    
    BindingGenerator.prototype.ConditionalOdd = function (property) {
        return this.Conditional(function (binding) {
            return binding[property] % 2 === 1;
        });
    };
    
    BindingGenerator.prototype.ConditionalEven = function (property) {
        return this.Conditional(function (binding) {
            return binding[property] % 2 === 0;
        });
    };
    
    BindingGenerator.prototype.ConditionalBetween = function (property, from, to) {
        return this.Conditional(function (binding) {
            return binding[property] <= to && binding[property] >= from;
        });
    };
    
    BindingGenerator.prototype.Remove = function () {
        this.steps.push(function() { return []; });
        
        return this;  
    };
    
    BindingGenerator.prototype.Generate = function () {
        var bindings = [BindingGenerator.createEmptyBinding()];
        
        this.steps.forEach(function (step) {
            bindings = step(bindings);
        });
        
        this.steps = [];
        
        var self = this;
        bindings.forEach(function (binding) {
            var flattenedBinding = {};
            for (var property in emptyBinding) {
                flattenedBinding[property] = binding[property];
            }
            
            self.generatedBindings.push(flattenedBinding);
        });
    };
    
    UIME.service("bindingGenerator", function() {
        return {
            parse: function (script) {
                var evaluator = new Function('generator', script);
                var generator = new BindingGenerator()
                
                evaluator(generator);
                
                return generator.generatedBindings;
            },
            
            createEmptyBinding: BindingGenerator.createEmptyBinding
        };  
    });
}(UIME));