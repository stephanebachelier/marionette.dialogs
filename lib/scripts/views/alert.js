var Alert = Dialog.extend({
  className: 'dialog dialog--alert',

  ui: {
    button: '.alert--button',
  },

  events: {
    'click @ui.button': 'dismiss'
  }
});
