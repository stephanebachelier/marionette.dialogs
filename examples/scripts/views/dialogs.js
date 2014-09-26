define([
  'marionette',
  'marionette.dialogs',
  'hbs!templates/main'
],
function (Marionette, Dialogs, template) {
  'use strict';

  return Marionette.ItemView.extend({
    template: template,
    ui: {
      button: 'a[data-action=open]'
    },

    events: {
      'click @ui.button': 'handleOpen'
    },

    handleOpen: function (e) {
      if (e.currentTarget.dataset.type) {
        this.trigger('dialog:open', e.currentTarget.dataset.type);
      }
    }
  });
});
