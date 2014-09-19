define([
  'marionette',
  'mobile.dialogs',
  'json!config/dialogs.json'
],
function (Marionette, dialogs, config) {
  'use strict';
  var builder = Object.create(null);

  builder.create = function (type) {
    if (!type && !dialogs[type]) {
      return;
    }
    var view = new dialogs[type]({
      dialog: config.dialogs[type] || {}
    });
    
    return view;
  };

  builder.showDialog = function (type, region) {
    var view = this.create(type);

    // we need to set the template before rendering the view
    require(['hbs!templates/' + type], function (template) {
      view.template = template;
      region.show(view);

      region.$el.toggleClass('active');
      view.on('destroy', function (view) {
        region.empty();
        region.$el.toggleClass('active');
      }, this);
    });
  };
  return builder;
});
