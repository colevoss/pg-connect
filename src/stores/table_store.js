/**
 * table_store.js
 * Flux store for table
 */
"use strict";
var AppDispatcher = require('../dispatcher/app_dispatcher'),
    EventEmitter = require('events').EventEmitter,
    TableConstants = require('../constants/table_constants'),
    _ = require('lodash');

var CHANGE_EVENT = 'change';

var _tables = {};

//function createTable(table) {
  //var _table = table;
  //_table._columns = []

  //_tables.push(_table)
//}

function fillTables(tables) {
  _tables = tables;
  //_tables = _.map(tables, function(table) {
    //table._columns = [];
    //return table;
  //});
}

//function populateColumnsForTable(table, columns) {
  //var table = _.find(_tables, {table_name: table});

  //table._columns = columns;
  //return table;
//}

var TableStore = _.assign({}, EventEmitter.prototype, {
  /**
   * Get the entire collection of databases
   * @return {object}
   */
  getTables: function () {
    return _tables;
  }, // getAll


  getTable: function(tableName) {
    if (_.has(_tables, tableName)) {
      return _tables[tableName];
    } else {
      return [];
    }
  },

  /**
   * Populates _columns attribute of table
   * @param {string} tableName
   * @param {array} columns - collection of columns
   * @return {object} table
   */
  //populateColumnsForTable: function (tableName, columns) {
    //var table = this.getTable(tableName);

    //table._columns = columns;
    //return table;
  //},


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

      case TableConstants.RETRIEVE_TABLES:
        if (!!Object.keys(action.tables).length) {
          fillTables(action.tables);

        } else {
          fillTables({});

        }

        break;

        // end RETRIEVE_TABLES
        //
      case TableConstants.GET_COLUMNS:
        if (!!action.columns.length) {
          populateColumnsForTable(action.table, action.columns)
        }

    } // switch
    TableStore.emitChange();

    return true; // No errors. Needed by promise in Dispatcher
  })

}); // TableStore (assign)

module.exports = TableStore;
