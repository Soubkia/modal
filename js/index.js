//Fork of http://codepen.io/jeffmccarthyesq/pen/LEEKLZ
//Now displays content that extends past the wrap size
$('button').on('click', function(){
  $('.modal, button').toggleClass('active');
});

(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-view'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='modal-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='modal-form'></form>",
    inputs: {
      text:
        "<input class='modal-input modal-input-text' autocomplete=off type=text />",
      textarea:
        "<textarea class='modal-input modal-input-textarea'></textarea>",
      email:
        "<input class='modal-input modal-input-email' autocomplete='off' type='email' />",
      select:
        "<select class='modal-input modal-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='modal-input modal-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='modal-input modal-input-date' autocomplete=off type='date' />",
      time:
        "<input class='modal-input modal-input-time' autocomplete=off type='time' />",
      number:
        "<input class='modal-input modal-input-number' autocomplete=off type='number' />",
      password:
        "<input class='modal-input modal-input-password' autocomplete='off' type='password' />"
    }
  };

	var defaults = {
	// default language
	locale: "en",
	// show backdrop or not. Default to static so user has to interact with dialog
	backdrop: "static",
	// animate the modal in/out
	animate: true,
	// additional class string applied to the top level dialog
	className: null,
	// whether or not to include a close button
	closeButton: true,
	// show the dialog immediately by default
	show: true,
	// dialog container
	container: "body"
	};

	// our public object; augmented after our private API
	var exports = {};

	/**
	* @private
	*/
	function _t(key) {
		var locale = locales[defaults.locale];
		return locale ? locale[key] : locales.en[key];
	}

	function processCallback(e, dialog, callback) {
		e.stopPropagation();
		e.preventDefault();

		// by default we assume a callback will get rid of the dialog,
		// although it is given the opportunity to override this

		// so, if the callback can be invoked and it *explicitly returns false*
		// then we'll set a flag to keep the dialog active...
		var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

		// ... otherwise we'll bin it
		if (!preserveDialog) {
		  dialog.modal("hide");
		}
	}
}