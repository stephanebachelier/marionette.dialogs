/*! marionette.dialogs - v0.0.0
 *  Release on: 2014-09-26
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
    }
  });
  
  dialogs.alert = Alert;

  var Confirm = Dialog.extend({
    className: 'dialog dialog--confirm',
  
    ui: {
      ok: '.confirm--ok--button',
      nok: '.confirm--nok--button'
    },
  
    events: {
      'click @ui.ok': 'confirm',
      'click @ui.nok': 'reject',
    },
  
    confirm: function () {
      this.triggerMethod('confirm');
      this.close();
    },
  
    reject: function () {
      this.triggerMethod('reject');
      this.close();
    }
  });
  
  dialogs.confirm = Confirm;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
