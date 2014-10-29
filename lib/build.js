define([
  'marionette'
], function (Marionette) {
  'use strict';

  var dialogs = {
    types: {}, // basic types provided by library
    custom: {} // any other types defined
  };

  // @include ./scripts/views/dialog.js
  dialogs.types.dialog = Dialog;

  // @include ./scripts/views/alert.js
  dialogs.types.alert = Alert;

  // @include ./scripts/views/confirm.js
  dialogs.types.confirm = Confirm;

  // @include ./scripts/views/notification.js
  dialogs.types.notification = Notification;

  // @include ./scripts/views/toast.js
  dialogs.types.toast = Toast;

  // @include ./scripts/views/waiting.js
  dialogs.types.waiting = Waiting;

  // @include ./scripts/views/splash.js
  dialogs.types.splash = Splash;

  dialogs.get = function (name) {
    return dialogs.types[name] || null;
  };

  dialogs.register = function (name, Type) {
    dialogs._custom[name] = Type;
  };

  // @include ./scripts/factory.js
  dialogs.Factory = Factory;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
