define([
  './alert.success',
  './alert.error',
  './notification',
  './waiting.foldable'
], function (AlertSuccess, AlertError, Notification, WaitingFoldable) {
  'use strict';

  var customDialogs = Object.create(null); // yes we want a hash like

  // it's only for example. The registry might need some logic :)
  customDialogs['alert.success'] = AlertSuccess;
  customDialogs['alert.error'] = AlertError;
  customDialogs.notification = Notification;
  customDialogs['waiting.foldable'] = WaitingFoldable;

  return customDialogs;
});
