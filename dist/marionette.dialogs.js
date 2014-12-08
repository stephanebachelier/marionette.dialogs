/*! marionette.dialogs - v0.6.1
 *  Release on: 2014-12-08
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
    initialize: function (options) {
      this.options = this.options || {};
  
      this.config = this.options && this.options.config ? this.options.config : {};
  
      if (this.options && this.options.template) {
        this.template = this.options.template;
      }
    },
  
    serializeData: function () {
      return this.config;
    },
  
    // `dismiss` is the preferred method to close the dialog
    dismiss: function (e) {
      if (e) {
        // stop event propagation
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
  };
  
  Factory.prototype.createDialog = function (options) {
    var opts = options || {};
  
    // search for dialog registered under name fallback to type
    var Dialog = this.dialogs.get(options.name || options.type);
  
    // add any classname if defined
    if (options.config && options.config.className) {
      opts.className = Dialog.prototype.className + ' ' + options.config.className;
    }
  
    // instanciate dialog
    return new Dialog(opts);
  };
  
  Factory.prototype.create = function (options) {
    if (!options) {
      return;
    }
  
    // enable the slug to be defined as an object
    var dialog;
  
    if ('[object Object]' === options.toString()) {
      var _name = options.name || options.type;
      if (this.config.dialogs[_name]) {
        dialog = _.extend({}, this.config.dialogs[_name], options);
      }
    }
    else {
      dialog = this.config.dialogs[options];
    }
  
    if (!dialog) {
      return;
    }
  
    return this.createDialog(dialog);
  };
  
  Factory.prototype.render = function (region, config, options) {
    if (!region) {
      return;
    }
  
    var dialog = this.create(config);
  
    if (!dialog) {
      return false;
    }
  
    region.show(dialog, options);
  
    return dialog;
  };
  
  dialogs.Factory = Factory;

  // attach to marionette
  Marionette.dialogs = dialogs;

  return dialogs;
});
