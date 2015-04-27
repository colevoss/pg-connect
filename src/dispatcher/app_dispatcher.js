"use strict";
var Dispatcher = require('./dispatcher'),
    _ = require('lodash');


var AppDispatcher = _.assign({}, Dispatcher.prototype, {

  handleViewAction: function (action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  } // handleViewAction

}); // AppDispatcher (assign)

module.exports = AppDispatcher;
