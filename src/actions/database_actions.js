/**
 * database_actions.js
 * Flux actions for databases
 */
"use strict";
var DatabaseConstants = require('../constants/database_constants'),
    AppDispatcher = require('../dispatcher/app_dispatcher');

var DatabaseActions = {

  retrieveDatabases: function (databases) {

    $.getJSON('/databases', function (data) {

      AppDispatcher.handleViewAction({
        actionType: DatabaseConstants.DATABASE_RETRIEVE_ALL,
        databases: data
      });

    });


  }

};

module.exports = DatabaseActions;
