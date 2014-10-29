define([
  'marionette',
  'marionette.dialogs',
  'json!config/dialogs.json'
],
function (Marionette, dialogs, config) {
  'use strict';

  return Marionette.Controller.extend({
    initialize: function (options) {
      this.region = this.options.region;

      this.factory = new dialogs.Factory(dialogs, {
        config: config
      });
    },

    showDialog: function (type) {
      if (!type) {
        return;
      }

      var self = this;

      require(['hbs!templates/' + type], function (template) {

        self.factory.render(self.region, type, {template: template});

        self.region.$el.toggleClass('active');
        // listen for view destruction
        self.region.currentView.on('destroy', function (view) {
          self.region.$el.toggleClass('active');
        }, self);
      });


    }
  });
});
