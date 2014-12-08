var Factory = function (dialogs, options) {
  this.dialogs = dialogs;

  this.options = options || {};
  this.config = options.config || {};
  this.templates = options.templates || {};
};

Factory.prototype.createDialog = function (dialog, options) {
  var opts = options || {};
  opts.dialog = dialog;

  var Dialog = this.dialogs.get(dialog.type);

  // add any classname if defined
  if (dialog.className) {
    opts.className = Dialog.prototype.className + ' ' + dialog.className;
  }

  // instanciate dialog
  var view = new Dialog(opts);
  // we need to set the template before rendering the view
  // if no template has been attached to the view search for the main template registry
  if (!view.template) {
    view.template = this.templates[dialog.template || dialog.type];
  }

  return view;
};

Factory.prototype.create = function (name, options) {
  if (!name) {
    return;
  }

  // enable the slug to be defined as an object
  var dialog;

  if ('[object Object]' === name.toString()) {
    var _name = name.name || name.type;
    if (this.config.dialogs[_name]) {
      dialog = _.extend({}, this.config.dialogs[_name], name);
    }
  }
  else {
    dialog = this.config.dialogs[name];
  }

  if (!dialog) {
    return;
  }

  return this.createDialog(dialog, options);
};

Factory.prototype.render = function (region, slug, options) {
  if (!region) {
    return;
  }

  // extract region options if any that will be passed to region.show call.
  var regionOptions = {};

  if (options && options.hasOwnProperty('region')) {
    regionOptions = options.region;
    // remove them from options are they are explicitly for region
    delete options.region;
  }

  var dialog = this.create(slug, options);

  if (!dialog) {
    return false;
  }

  region.show(dialog, regionOptions);

  return dialog;
};
