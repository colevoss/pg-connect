/**
 * data_actions.js
 * Flux actions for data
 */
"use strict";
var DataConstants = require('../constants/data_constants'),
    AppDispatcher = require('../dispatcher/app_dispatcher');

var DataActions = {

  /**
   * TODO: If columns already have been gotten for table then
   * just get them from the store
   */
  getDataForTable: function (db, table) {
    var route = '/databases/' + db + '/' + table + '/data';
    $.getJSON(route, function(data) {

      AppDispatcher.handleViewAction({
        actionType: DataConstants.GET_DATA,
        data: data,
      });

    });

  }

};

module.exports = DataActions;
