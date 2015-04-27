/**
 * data_store.js
 * Flux store for data
 */
"use strict";
var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    DataConstants = require('../constants/data_constants'),
    _ = require('lodash');

var CHANGE_EVENT = 'change';

var _data = [];

function fillData(data) {
  _data = data;
}


var DataStore = _.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of databases
   * @return {object}
   */
  getData: function () {
    return _data;
  }, // getAll


  emitChange: function () {
    this.emit(CHANGE_EVENT);
  }, // emitChange


  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },


  /**
   * @param {funciton} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },


  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

      case DataConstants.GET_DATA:
        if (!!action.data.length) {
          fillData(action.data);

        } else {
          fillData([]);

        }

        break;

    } // switch
    DataStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher
  })

}); // DataStore (assign)

module.exports = DataStore;
