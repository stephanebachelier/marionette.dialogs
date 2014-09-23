define([
  'marionette'
], function (Marionette) {
  'use strict';

  var dialogs = {};
  // @include ./scripts/views/dialog.js
  dialogs.dialog = Dialog;

  // @include ./scripts/views/alert.js
  dialogs.alert = Alert;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
