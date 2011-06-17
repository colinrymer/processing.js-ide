/**
Copyright (C) 2011 by Semmy Purewal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
**/

(function (window)  {
    function ide(divName, options)  {
	var divName = divName || "ide";
	var ideDiv = window.document.getElementById(divName);
	var buttonsDiv = window.document.createElement("div");
	buttonsDiv.setAttribute("id", "buttons");
	var editorDiv = window.document.createElement("div");
	editorDiv.setAttribute("id", "editor");
	ideDiv.appendChild(buttonsDiv);
	ideDiv.appendChild(editorDiv);
	
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/eclipse");

	var JavaMode = require("ace/mode/java").Mode;
	editor.getSession().setMode(new JavaMode());
	editor.setHighlightActiveLine(false);

	//code getter/setter, no argument gets code, argument sets code
	ide.prototype.code = function(code)  {
	    if(!code)  {
		return editor.getSession().getValue();
	    }
	    else  {
		editor.getSession().setValue(code);
	    }
	}

	ide.prototype.onChange = function(fn)  {
	    editor.getSession().on('change', fn);
	}

	// button getter/adder
	// if img and fn are defined, adds a button to the ide
	// else returns the a element associated with the button
	ide.prototype.button = function(name, img, fn)  {
	    if(img && fn)  {
		var buttonImg = window.document.createElement("img");
		buttonImg.setAttribute("class", "button");
		buttonImg.setAttribute("src",img);
		var buttonA = window.document.createElement("a");
		buttonA.setAttribute("id", name+"_button");
		buttonA.appendChild(buttonImg);
		buttonsDiv.appendChild(buttonA);
		buttonA.onclick = function() { fn(); };
	    }
	    else  {
		return window.document.getElementById(name+"_button");;
	    }
	}

    }
	
    window.ide = ide;
})(window);