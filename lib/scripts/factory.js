var Factory = function (dialogs, options) {
  this.dialogs = dialogs;

  this.options = options || {};
  this.config = options.config || {};
};

Factory.prototype.createDialog = function (options) {
  var opts = options || {};

  // search for dialog registered under name fallback to type
  var Dialog = this.dialogs.get(options.name) || this.dialogs.get(options.type);

  // add any classname if defined
  if (options.config && options.config.className) {
    opts.className = Dialog.prototype.className + ' ' + options.config.className;
  }

  // instanciate dialog
  return new Dialog(opts);
};

Factory.prototype.buildConfiguration = function (options) {
  var defaults = {};
  if (this.config.dialogs[options.type]) {
    defaults = this.config.dialogs[options.type];
  }
  return _.extend(defaults, this.config.dialogs[options.name], options);
};

Factory.prototype.create = function (options) {
  if (!options) {
    return;
  }

  // enable the slug to be defined as an object
  var dialog;

  if ('[object Object]' === options.toString()) {
    dialog = this.buildConfiguration(options);
  }
  else {
    var opts = this.config.dialogs[options];
    dialog = this.buildConfiguration(opts);
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
