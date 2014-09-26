/*
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    'handlebars.runtime': '../bower_components/handlebars/handlebars.runtime.amd',
    marionette: '../bower_components/backbone.marionette/lib/core/backbone.marionette',
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
    hbs: '../bower_components/require-handlebars-plugin/hbs',
    text: '../bower_components/requirejs-text/text',
    json: '../bower_components/requirejs-plugins/src/json'
  },
  // default
  hbs: {}
});
*/
require([
  'marionette',
  './controllers/dialogs',
  './views/dialogs'
], function (Marionette, DialogController, DialogsView) {
  console.log('test');

  var app = new Marionette.Application();
  app.addRegions({
    container: '.content-padded',
    dialogs: '.dialog-container'
  });

  app.addInitializer(function () {
    // render the main view with ui dialogs elements
    var view = new DialogsView();
    app.container.show(view);

    // controller that is responsible for rendering dialogs in the region
    this.controller = new DialogController({
      region: app.dialogs
    });

    view.on('dialog:open', this.controller.showDialog, this.controller);
  });

  app.start();
});
