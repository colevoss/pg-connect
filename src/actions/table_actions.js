/**
 * table_actions.js
 * Flux actions for tables
 */
"use strict";
var TableConstants = require('../constants/table_constants'),
    AppDispatcher = require('../dispatcher/app_dispatcher');

var TableActions = {

  retrieveTablesForDatabase: function (dbName) {
    $.getJSON('/databases/' + dbName, function(data) {

      AppDispatcher.handleViewAction({
        actionType: TableConstants.RETRIEVE_TABLES,
        tables: data
      });

    });

  },

};

module.exports = TableActions;
