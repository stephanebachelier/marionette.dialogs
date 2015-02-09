var Notification = Dialog.extend({
  className: 'dialog dialog--notification',

  events: {
    click: 'dismiss'
  },

  onRender: function () {
    if (this.config && this.config.timeout) {
      this.runTimer(this.config.timeout);
    }
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
  }
});
