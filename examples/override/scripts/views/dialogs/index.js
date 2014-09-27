define([
  './alert.success',
  './alert.error'
], function (AlertSuccess, AlertError) {
  'use strict';

  var customDialogs = Object.create(null); // yes we want a hash like

  // it's only for example. The registry might need some logic :)
  customDialogs['alert.success'] = AlertSuccess;
  customDialogs['alert.error'] = AlertError;

  return customDialogs;
});
