define([
  './alert.success'
], function (AlertSuccess) {
  'use strict';

  var customDialogs = Object.create(null); // yes we want a hash like

  // it's only for example. The registry might need some logic :)
  customDialogs['alert.success'] = AlertSuccess;

  return customDialogs;
});
