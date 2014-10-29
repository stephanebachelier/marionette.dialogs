define([
  'marionette',
  '../dialog.registry',
  'json!config/dialogs.json'
],
function (Marionette, registry, config) {
  'use strict';
  var builder = Object.create(null);

  builder.create = function (type) {
    if (!type && !registry[type]) {
      return;
    }
    var view = new registry[type]({
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

      region.$el.addClass('active');
      view.on('destroy', function (view) {
        region.$el.removeClass('active');
      }, this);
    });
  };
  return builder;
});
