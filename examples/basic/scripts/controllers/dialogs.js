define([
  'marionette',
  './dialog.builder'
],
function (Marionette, dialogBuilder) {
  'use strict';

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.region = this.options.region;
    },

    showDialog: function (type) {
      if (!type) {
        return;
      }

      dialogBuilder.showDialog(type, this.region);
    }
  });
});
