var Notification = Dialog.extend({
  className: 'dialog dialog--notification',

  events: {
    click: 'dismiss'
  },

  // `dismiss` is the preferred method to close the alert
  dismiss: function (e) {
    if (e) {
      // stop event propagation
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    // close view as alert is only informative
    // if developer want to track alert closing the `close` event
    // is always triggered
    this.destroy();
  }
});
