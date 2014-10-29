define([
  'marionette'
], function (Marionette) {
  'use strict';

  var dialogs = {};
  // @include ./scripts/views/dialog.js
  dialogs.dialog = Dialog;

  // @include ./scripts/views/alert.js
  dialogs.alert = Alert;

  // @include ./scripts/views/confirm.js
  dialogs.confirm = Confirm;

  // @include ./scripts/views/notification.js
  dialogs.notification = Notification;

  // @include ./scripts/views/toast.js
  dialogs.toast = Toast;

  // @include ./scripts/views/waiting.js
  dialogs.waiting = Waiting;

  // @include ./scripts/views/splash.js
  dialogs.splash = Splash;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
