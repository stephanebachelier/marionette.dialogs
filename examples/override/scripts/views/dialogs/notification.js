define([
  'marionette.dialogs'
], function (dialogs) {
  'use strict';

  // here the purpose of this notification is just to add a close button
  // which help people understand that they can dismiss the notification
  // by clicking or touching it

  // Important, as the view is named notification it will be the default notification in
  // the registry. It will not override the marionette.dialogs which will still be accessible
  // by requesting `marionette.dialogs` dependency. If you don't want this behavior simply choose
  // a different name like `notification.closeable` or `closeable.notification`. The second is more
  // readable, but IMHO you kind of lose the namespace
  return dialogs.notification.extend({
    ui: {
      closeButton: '.icon-close'
    },

    events: {
      'click @ui.closeButton': 'dismiss'
    }
  });
});
