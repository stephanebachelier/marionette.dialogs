var Dialog = Marionette.ItemView.extend({
  initialize: function (options) {
    this.options = this.options || {};

    if (this.options && this.options.template) {
      this.template = this.options.template;
    }
  },

  serializeData: function () {
    return this.options.dialog || {};
  },

  // `dismiss` is the preferred method to close the dialog
  dismiss: function (e) {
    if (e) {
      // stop event propagation
      e.stopImmediatePropagation();
    }

    // if developer want to track dialog closing the `destroy` event
    // is always triggered
    this.destroy();
  }
});
