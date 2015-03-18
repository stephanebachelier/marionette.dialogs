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

  // run a timer which will dismiss the view when complete
  runTimer: function (timeout) {
    // somewhat hideous as it could simply and better written
    // `setTimeout(this.dismiss.bind(this), timeout);`
    // but hey we may need to support device which are not ES5
    var self = this;
    setTimeout(function () {
      self.dismiss();
    }, timeout);
  },

  onRender: function () {
    if (this.config && this.config.timeout) {
      this.runTimer(this.config.timeout);
    }
  },

  // default handler
  onDismiss: function () {
    this.destroy();
  }
});
