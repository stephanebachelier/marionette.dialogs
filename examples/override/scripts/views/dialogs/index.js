define([
  './alert.success',
  './alert.error',
  './waiting.foldable'
], function (AlertSuccess, AlertError, WaitingFoldable) {
  'use strict';

  var customDialogs = Object.create(null); // yes we want a hash like

  // it's only for example. The registry might need some logic :)
  customDialogs['alert.success'] = AlertSuccess;
  customDialogs['alert.error'] = AlertError;
  customDialogs['waiting.foldable'] = WaitingFoldable;

  return customDialogs;
});
