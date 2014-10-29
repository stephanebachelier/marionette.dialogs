define([
  'marionette.dialogs',
  'underscore',
  'views/dialogs/index'
],
function (dialogs, _, customDialogs) {
  'use strict';

  // this is the place where we register any dialogs
  // here we only add the predefined, which is the ones provided by marionette.dialogs
  // any custom views will need to be added to the registry to be found by any registry consumer
  // or it will needed to be called directly.
  var registry = _.extend(_.clone(dialogs.types), customDialogs);

  return registry;
});
