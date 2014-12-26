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
    this.log('no options given');
    return;
  }

  // enable the slug to be defined as an object
  var configuration;

  if ('[object Object]' === options.toString()) {
    configuration = this.buildConfiguration(options);
  }
  else {
    var opts = this.config.dialogs[options];
    if (!opts) {
      this.log('no configuration found for the given options');
      return;
    }
    configuration = this.buildConfiguration(opts);
  }

  if (!configuration) {
    this.log('configuration not found');
    return;
  }

  return this.createDialog(configuration);
};

Factory.prototype.render = function (region, config, options) {
  if (!region) {
    return;
  }

  var dialog = this.create(config);

  if (!dialog) {
    this.log('Failed to create dialog from given options');
    return false;
  }

  region.show(dialog, options);

  return dialog;
};

Factory.prototype.log = function (message) {
  console.warn('[dialogs:factory]', message);
};
