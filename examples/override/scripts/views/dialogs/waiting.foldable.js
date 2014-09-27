define([
  'marionette.dialogs'
], function (dialogs) {
  'use strict';

  return dialogs.waiting.extend({
    events: {
      click: 'toggleDisplay'
    },

    toggleDisplay: function () {
      this.$el.toggleClass('fold');
    }
  });
});
