(function ($) {
	// enable ES5 strict mode
    'use strict';

	// save the original plugin
    var _parent = $.fn.modal;

	// define your own constructor
    var Modal = function (element, options) {
        _parent.Constructor.apply(this, arguments);
	// console.log calls are here just to see that our method is called.
            console.log('modal initialized');
    };

	// set custom default options
    Modal.DEFAULTS = $.extend({}, _parent.Constructor.DEFAULTS, {
        backdrop: 'static'
    });

	// extend the prototype for your plugin from the original plugin
    Modal.prototype = Object.create(_parent.Constructor.prototype);

	// define a method for easy access to parent methods
    Modal.prototype.parent = function () {
        var args = $.makeArray(arguments),
            method = args.shift();
        _parent.Constructor.prototype[method].apply(this, args)
    };

	// override the show method to demonstrate
    Modal.prototype.show = function () {
        this.parent('show');
        console.log('show called');
    };

	// override the actual jQuery plugin method
    $.fn.modal = function (option, _relatedTarget) {
        console.log('modal plugin called');
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.modal'),
                options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option === 'object' && option);
            if (!data) {
                $this.data('bs.modal', (data = new Modal(this, options)));
            }
            if (typeof option === 'string') {
                data[option](_relatedTarget);
            } else if (options.show) {
                data.show(_relatedTarget);
            }
        });
    };

	// override the plugin constructor
    $.fn.modal.Constructor = Modal;

	// override the plugin no-conflict method
    $.fn.modal.noConflict = function () {
        $.fn.modal = _parent;
        return this;
    };
})(jQuery);