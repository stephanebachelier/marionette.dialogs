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

Factory.prototype.create = function (slug, options) {
  if (!slug && !this.config.dialogs[slug]) {
    return;
  }

  var dialog = this.config.dialogs[slug];
  return this.createDialog(dialog, options);
};

Factory.prototype.render = function (region, slug, options) {
  if (!region) {
    return;
  }

  var dialog = this.create(slug, options);

  if (!dialog) {
    return false;
  }

  region.show(dialog);

  return dialog;
};
