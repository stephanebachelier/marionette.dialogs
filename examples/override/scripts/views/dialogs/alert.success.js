define([
  'marionette.dialogs'
], function (dialogs) {
  'use strict';

  return dialogs.alert.extend({
    // basically this view does nothing more than adding a class `alert--success`
    // and to avoid removing anything predefined className it append the className
    // to parent (read prototype) property `className`
    className: function () {
      return dialogs.alert.prototype.className + ' ' + 'alert--success';
    }
  });
});
