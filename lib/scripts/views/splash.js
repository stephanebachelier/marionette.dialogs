var Splash = Dialog.extend({
  className: 'dialog splash',

  ui: {
    buttons: '.splash--button'
  },

  events: {
    'click @ui.buttons': 'onClicked'
  },

  onClicked: function (e) {
    this.dismiss();
  }
});
