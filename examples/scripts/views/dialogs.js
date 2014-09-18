define([
  'marionette',
  'mobile.dialogs',
  'hbs!templates/main'
],
function (Marionette, Dialogs, template) {
  'use strict';

  return Marionette.ItemView.extend({
    template: template,
    ui: {
      button: 'button[data-action=open]'
    },

    events: {
      'click @ui.button': 'openDialog'
    },

    openDialog: function (e) {
      var type = e && e.currentTarget.dataSet('type');
      var dialog;
      if (type && Dialogs[type]) {
        dialog = new Dialogs[type]();
      }
    }
  });
});
