var Alert = Dialog.extend({
  className: 'dialog alert',

  ui: {
    button: '.alert--button',
  },

  events: {
    'click @ui.button': 'dismiss'
  }
});
