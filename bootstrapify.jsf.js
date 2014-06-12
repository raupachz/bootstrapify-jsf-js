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

    // credits: http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery#15554920
    $.fn.changeElementType = function(newType) {
        var newElements = [];

        $(this).each(function() {
            var attrs = {};

            $.each(this.attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            var newElement = $("<" + newType + "/>", attrs).append($(this).contents());

            $(this).replaceWith(newElement);

            newElements.push(newElement);
        });

        return $(newElements);
    };

    function bootstrapifyButtons() {
        $(".btn").each(function() {
            var icon = $(this).attr("data-fa");
            var val = $(this).attr("value");
            $(this).removeAttr("value");
            $(this).removeAttr("data-fa");
            if (icon) {
                $(this).html("<span class=\"fa " + icon + "\"></span> " + val);
            } else {
                $(this).html(val);
            }
            $(this).changeElementType("button");
        });
    }

    // <h:messages id="messages" 
    //             globalOnly="true"
    //             infoClass="alert-info" 
    //             warnClass="alert-warn"
    //             errorClass="alert-error" 
    //             fatalClass="alert-success" />
    function bootstrapifyMessages() {
        $("#messages").changeElementType("div");
        $("#messages li").changeElementType("div");
    }

    // <h:inputRadio styleClass="input-radio"/>
    function bootstrapifyInputRadio() {
        $("input:radio").each(function() {
            var label = $(this).siblings();
            label.addClass("radio").addClass("inline");
            $(this).prependTo(label);

            label.appendTo(label.parents(".input-radio").parent());
        });
        $("table.input-radio").remove();
    }

    // <h:message for="..." styleClass="help-inline" />
    function bootstrapifyMessage() {
        $("form .help-inline").each(function() {
            $(this).parents(".control-group").addClass("error");
            $(this).siblings(".help-block").remove();
        });
    }

    // Call these methods onload
    $(document).ready(function() {
        bootstrapifyButtons();
        bootstrapifyMessages();
        bootstrapifyMessage();
        bootstrapifyInputRadio();
    });

})(jQuery);