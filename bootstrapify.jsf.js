/* 
 * Copyright 2013 Björn Rauapch
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {
	
	// Ist das DOM geladen werden folgende Funktionen ausgeführt.
	$(document).ready(function() {
		bootstrapifyMessages();
		bootstrapifyMessage();
	});
	
	// <h:messages id="messages" infoClass="alert-info" warnClass="alert-warn" errorClass="alert-error" fatalClass="alert-success" globalOnly="true"/>
	function bootstrapifyMessages() {
		var msgs = $("#messages");
		if (msgs.length > 0) {
			var styleClasses=["alert-info", "alert-warn", "alert-error", "alert-success"];
			for (var i = 0; i < styleClasses.length; i++) {
				var styleClass = styleClasses[i];
				
				var msg = msgs.children("." + styleClass);
				if (msg.length > 0) {
					var block = $("<div class=\"alert\"></div>").addClass(styleClass);
					var closeButton = $("<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>");
					block.append(closeButton);
					
					var heading;
					switch (styleClass) {
						case "alert-info" : heading = "Info"; break;
						case "alert-warn" : heading = "Achtung"; break;
						case "alert-error" : heading = "Fehler"; break;
						case "alert-success" : heading = "✔"; break;
					}
					
					if (msg.length > 1) {
						block.addClass("alert-block");
						block.append($("<h4></h4>").text(heading));
						block.append($("<ul></ul>").append(msg));
					} else {
						block.append($("<strong></strong>").text(heading));
						block.append(msg.text());
					}
					
					msgs.parent().append(block);
				}
			}
			msgs.remove();
		}
	}
	
	// <h:message for="..." styleClass="help-inline" />
	function bootstrapifyMessage() {
		$("form .help-inline").each(function() {
			$(this).parents(".control-group").addClass("error");
			$(this).siblings(".help-block").remove();
		});
	}
	
}(jQuery));