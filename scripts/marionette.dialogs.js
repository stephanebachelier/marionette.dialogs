/*! marionette.dialogs - v0.4.3
 *  Release on: 2014-10-29
 *  Copyright (c) 2014 Stéphane Bachelier
 *  Licensed MIT */
define([
  'marionette'
], function (Marionette) {
  'use strict';

  var dialogs = {
    types: {}, // basic types provided by library
    custom: {} // any other types defined
  };

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
  
  dialogs.types.dialog = Dialog;

  var Alert = Dialog.extend({
    className: 'dialog dialog--alert',
  
    ui: {
      button: '.alert--button',
    },
  
    events: {
      'click @ui.button': 'dismiss'
    }
  });
  
  dialogs.types.alert = Alert;

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
  
  dialogs.types.confirm = Confirm;

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
  
  dialogs.types.notification = Notification;

  var Toast = Notification.extend({
    className: 'dialog dialog--toast',
  });
  
  dialogs.types.toast = Toast;

  var Waiting = Dialog.extend({
    className: 'dialog dialog--waiting'
  });
  
  dialogs.types.waiting = Waiting;

  var Splash = Dialog.extend({
    className: 'dialog dialog--splash',
  
    ui: {
      buttons: '.splash--button'
    },
  
    events: {
      'click @ui.buttons': 'onClicked'
    },
  
    onClicked: function (e) {
      this.dismiss();
    }
  });
  
  dialogs.types.splash = Splash;

  dialogs.get = function (name) {
    return dialogs.types[name] || dialogs.custom[name] || null;
  };

  dialogs.register = function (name, Type) {
    dialogs.custom[name] = Type;
  };

  var Factory = function (dialogs, options) {
    this.dialogs = dialogs;
  
    this.options = options || {};
    this.config = options.config || {};
    this.templates = options.templates || {};
  };
  
  Factory.prototype.createDialog = function (dialog, options) {
    var opts = options || {};
    opts.dialog = dialog;
  
    var Dialog = this.dialogs.get(dialog.type);
  
    // add any classname if defined
    if (dialog.className) {
      opts.className = Dialog.prototype.className + ' ' + dialog.className;
    }
  
    // instanciate dialog
    var view = new Dialog(opts);
    // we need to set the template before rendering the view
    // if no template has been attached to the view search for the main template registry
    if (!view.template) {
      view.template = this.templates[dialog.template || dialog.type];
    }
  
    return view;
  };
  
  Factory.prototype.create = function (slug, options) {
    if (!slug && !this.config.dialogs[slug]) {
      return;
    }
  
    var dialog = this.config.dialogs[slug];
    return this.createDialog(dialog, options);
  };
  
  Factory.prototype.render = function (region, slug, options) {
    if (!region) {
      return;
    }
  
    var dialog = this.create(slug, options);
  
    if (!dialog) {
      return false;
    }
  
    region.show(dialog);
  
    return dialog;
  };
  
  dialogs.Factory = Factory;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
