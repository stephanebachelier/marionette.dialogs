var Confirm = DialogView.extend({
  className: 'dialog dialog--confirm',

  ui: {
    ok: '.confirm--ok--button',
    nok: '.confirm--nok--button'
  },

  events: {
    'click @ui.ok': 'confirm',
    'click @ui.nok': 'reject',
  },

  confirm: function () {
    this.triggerMethod('confirm');
    this.close();
  },

  reject: function () {
    this.triggerMethod('reject');
    this.close();
  }
});
