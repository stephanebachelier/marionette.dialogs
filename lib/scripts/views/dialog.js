var Dialog = Marionette.ItemView.extend({
  initialize: function (options) {
    this.options = this.options || {};

    this.config = this.options && this.options.config ? this.options.config : {};

    if (this.options && this.options.template) {
      this.template = this.options.template;
    }
  },

  serializeData: function () {
    return this.config;
  },

  // `dismiss` is the preferred method to close the dialog
  dismiss: function (e) {
    if (e) {
      // stop event propagation
      e.stopImmediatePropagation();
    }

    // trigger dismiss event
    this.triggerMethod('dismiss');
  },

  // default handler
  onDismiss: function () {
    this.destroy();
  }
});
