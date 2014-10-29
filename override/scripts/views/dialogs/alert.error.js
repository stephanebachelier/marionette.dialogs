define([
  'marionette.dialogs'
], function (dialogs) {
  'use strict';

  var alert = dialogs.types.alert;
  
  return alert.extend({
    // basically this view does nothing more than adding a class `alert--error`
    // and to avoid removing anything predefined className it append the className
    // to parent (read prototype) property `className`
    className: function () {
      return alert.prototype.className + ' ' + 'alert--error';
    }
  });
});
