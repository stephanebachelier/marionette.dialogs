/*! mobile.dialogs - v0.0.0
 *  Release on: 2014-09-18
 *  Copyright (c) 2014 Stéphane Bachelier
 *  Licensed MIT */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  var dialogs = {};
  var Dialog = Marionette.ItemView.extend({
    serializeData: function () {
      return this.options.dialog || {};
    }
  });
  
  dialogs.dialog = Dialog;

  var Alert = Dialog.extend({
    className: 'dialog dialog--alert',
  
    events: {
      click: 'dismiss'
    },
  
    // `dismiss` is the preferred method to close the alert
    dismiss: function (e) {
      if (e) {
        // stop event propagation
        e.preventDefault();
        e.stopImmediatePropagation();
      }
  
      // close view as alert is only informative
      // if developer want to track alert closing the `close` event
      // is always triggered
      this.destroy();
    },
  
    serializeData: function () {
      var data = Dialog.prototype.serializeData.apply(this);
  
      // set result to data default to error.
      data.result = this.result || 'error';
  
      return data;
    }
  });
  
  dialogs.alert = Alert;
  
  dialogs.alert = Alert;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
