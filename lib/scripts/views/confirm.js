var Confirm = Dialog.extend({
  className: 'dialog dialog--confirm',

  ui: {
    ok: '.confirm--ok--button',
    nok: '.confirm--nok--button'
  },

  events: {
    'click @ui.ok': 'confirm',
    'click @ui.nok': 'reject',
  },

  // simple wrapper around confirm button which will result in triggering the event 'confirm' and close the view.
  // The object who has created the dialog should listen to the event, which should be sufficient for most use cases.
  // If not, define and use the `onConfirm` method
  confirm: function () {
    this.triggerMethod('confirm');
    this.dismiss();
  },

  // simple wrapper around reject button which will result in triggering the event 'reject' and close the view.
  // The object who has created the dialog should listen to the event, which should be sufficient for most use cases.
  // If not, define and use the `onReject` method
  reject: function () {
    this.triggerMethod('reject');
    this.dismiss();
  }
});
