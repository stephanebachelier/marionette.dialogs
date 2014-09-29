/*! marionette.dialogs - v0.1.0
 *  Release on: 2014-09-29
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
    },
  
    // `dismiss` is the preferred method to close the dialog
    dismiss: function (e) {
      if (e) {
        // stop event propagation
        e.preventDefault();
        e.stopImmediatePropagation();
      }
  
      // if developer want to track dialog closing the `destroy` event
      // is always triggered
      this.destroy();
    }
  });
  
  dialogs.dialog = Dialog;

  var Alert = Dialog.extend({
    className: 'dialog dialog--alert',
  
    ui: {
      button: '.alert--button',
    },
  
    events: {
      'click @ui.button': 'dismiss'
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
  
    // simple wrapper around confirm button which will result in triggering the event 'confirm' and close the view.
    // The object who has created the dialog should listen to the event, which should be sufficient for most use cases.
    // If not, define and use the `onConfirm` method
    confirm: function () {
      this.triggerMethod('confirm');
      this.dismiss();
    },
  
    // simple wrapper around reject button which will result in triggering the event 'reject' and close the view.
    // The object who has created the dialog should listen to the event, which should be sufficient for most use cases.
    // If not, define and use the `onReject` method
    reject: function () {
      this.triggerMethod('reject');
      this.dismiss();
    }
  });
  
  dialogs.confirm = Confirm;

  var Notification = Dialog.extend({
    className: 'dialog dialog--notification',
  
    events: {
      click: 'dismiss'
    },
  
    onRender: function () {
      if (this.getOption('timeout')) {
        this.runTimer(this.getOption('timeout'));
      }
    },
  
    // run a timer which will dismiss the view when complete
    runTimer: function (timeout) {
      // somewhat hideous as it could simply and better written
      // `setTimeout(this.dismiss.bind(this), timeout);`
      // but hey we may need to support device which are not ES5
      var self = this;
      setTimeout(function () {
        self.dismiss();
      }, timeout);
    }
  });
  
  dialogs.notification = Notification;

  var Waiting = Dialog.extend({
    className: 'dialog dialog--waiting'
  });
  
  dialogs.waiting = Waiting;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
