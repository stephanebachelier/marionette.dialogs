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
  },
  // default
  hbs: {}
});

require([
  'marionette',
  './views/dialogs'
], function (Marionette, DialogsView) {
  'use strict';
  console.log('test');

  var app = new Marionette.Application();
  app.addRegions({
    container: '.content-padded'
  });

  app.addInitializer(function () {
    app.container.show(new DialogsView());
  });

  app.start();
});
