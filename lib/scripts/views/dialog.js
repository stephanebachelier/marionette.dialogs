var Dialog = Marionette.ItemView.extend({
  serializeData: function () {
    return this.options.dialog || {};
  },

  // `dismiss` is the preferred method to close the dialog
  dismiss: function (e) {
    if (e) {
      // stop event propagation
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    // if developer want to track dialog closing the `destroy` event
    // is always triggered
    this.destroy();
  }
});
