var Dialog = Marionette.ItemView.extend({
  serializeData: function () {
    return this.options.dialog || {};
  }
});
