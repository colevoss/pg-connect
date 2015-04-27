/** @jsx React.DOM */

(function () {
  "use strict";

  Object.assign = Object.assign || require('object.assign');
  var _ = require('lodash');
  var React = require('react');
  var Router = require('react-router');
  var Link = Router.Link;

  var DatabaseStore = require('../stores/database_store');
  var DatabaseActions = require('../actions/database_actions');

  var TableStore = require('../stores/table_store');
  var TableActions = require('../actions/table_actions');

  var DataStore = require('../stores/data_store');
  var DataActions = require('../actions/data_actions');

  var Table = React.createClass({
    mixins: [Router.State],


    columnOrder: function() {
      var columns = _.map(this.state.table, function(column) {
        return {name: column.column_name, order: column.ordinal_position};
      });

      return _.sortBy(columns, 'order');
    },

    tableName: function() {
      return this.getParams().table;
    },

    getInitialState: function () {
      return {
        table: TableStore.getTable(this.tableName()),
        data: DataStore.getData()
      };
    },


    getTableFromStore: function() {
      return {
        table: TableStore.getTable(this.tableName())
      };
    },

    getDataFromStore: function() {
      return {
        data: DataStore.getData()
      };
    },


    componentWillMount: function () {
      TableStore.addChangeListener(this.updateTable);
      DataStore.addChangeListener(this.updateData);
    },


    componentDidMount: function () {
      var db = this.getParams().database;
      var table = this.getParams().table;
      DataActions.getDataForTable(db, table);
    },


    componentWillUnmount: function () {
      TableStore.removeChangeListener(this.updateTable);
      DataStore.removeChangeListener(this.updateData);
    },


    componentWillReceiveProps: function(nextProps) {
      if (this.props.params.table !== nextProps.params.table) {

        this.updateTable();
        var db = this.getParams().database;
        var table = this.getParams().table;

        DataActions.getDataForTable(db, table);
      }
    },

    updateTable: function() {
      this.setState(this.getTableFromStore());
    },

    updateData: function() {
      this.setState(this.getDataFromStore());
    },


    /**
     * TODO: make sortable
     */
    tableHeaderColumnsDom: function() {
      return this.state.table.map(function(column) {
        return (
          <td key={column.column_name} className="text-center">
            <a>{column.column_name}</a>
          </td>
        );
      });
    },

    dataRowsDom: function() {

      var rows =  this.state.data.map(function(row) {

        var cells = this.columnOrder().map(function(column) {
          return (<td>{row[column.name]}</td>);
        });


        return (
          <tr>{cells}</tr>
        );

      }.bind(this));

      return rows;
    },


    render: function() {
      console.log('rendereing');
      return (
        <div className="panel panel-info">
          <div className="table-responsive">
            <table className="table table-striped table-condensed table-bordered">
              <thead>
                <tr>{this.tableHeaderColumnsDom()}</tr>
              </thead>

              <tbody>
                {this.dataRowsDom()}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

  });

  module.exports = Table;

}());
