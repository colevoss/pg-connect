/**
 * database_store.js
 * Flux store for databases
 */
"use strict";
var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    DatabaseConstants = require('../constants/database_constants'),
    _ = require('lodash');

var CHANGE_EVENT = 'change';

var _databases = [];

/**
 * Create a database item.
 * @param {string} database - Name of database
 */

function create (database) {

  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _databases[id] = {
    id: id,
    name: database
  };

} // create

/**
 * Delete database item.
 * @param {string} id
 */

function destroy(id) {
  delete _databases[id];
}


function fillDatabases(databases) {
  _databases = databases;
}


var DatabaseStore = _.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of databases
   * @return {object}
   */
  getAll: function () {
    return _databases;
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
    var text,
        action = payload.action;

    switch (action.actionType) {

      case DatabaseConstants.DATABASE_RETRIEVE_ALL:
        if (!!action.databases.length) {
          fillDatabases(action.databases)

        } else {
          fillDatabases([]); // Default to empty array

        }
        break;

        // DATABASE_RETRIEVE_ALL

    } // switch
    DatabaseStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher
  })

}); // DatabaseStore (assign)

module.exports = DatabaseStore;
