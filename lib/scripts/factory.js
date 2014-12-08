var Factory = function (dialogs, options) {
  this.dialogs = dialogs;

  this.options = options || {};
  this.config = options.config || {};
};

Factory.prototype.createDialog = function (options) {
  var opts = options || {};

  // search for dialog registered under name fallback to type
  var Dialog = this.dialogs.get(options.name || options.type);

  // add any classname if defined
  if (options.config && options.config.className) {
    opts.className = Dialog.prototype.className + ' ' + options.config.className;
  }

  // instanciate dialog
  return new Dialog(opts);
};

Factory.prototype.create = function (options) {
  if (!options) {
    return;
  }

  // enable the slug to be defined as an object
  var dialog;

  if ('[object Object]' === options.toString()) {
    var _name = options.name || options.type;
    if (this.config.dialogs[_name]) {
      dialog = _.extend({}, this.config.dialogs[_name], options);
    }
  }
  else {
    dialog = this.config.dialogs[options];
  }

  if (!dialog) {
    return;
  }

  return this.createDialog(dialog);
};

Factory.prototype.render = function (region, config, options) {
  if (!region) {
    return;
  }

  var dialog = this.create(config);

  if (!dialog) {
    return false;
  }

  region.show(dialog, options);

  return dialog;
};
