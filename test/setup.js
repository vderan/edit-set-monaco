define('vs/css', [], {
	load: function (name, req, load) {
		load({});
	}
});

define('vs/nls', [], {
	create: function () {
		return {
			localize: function () {
				return 'NO_LOCALIZATION_FOR_YOU';
			}
		};
	},
	localize: function () {
		return 'NO_LOCALIZATION_FOR_YOU';
	},
	load: function (name, req, load) {
		load({});
	}
});

define(['vs/editor/editor.main', function () {}]);
