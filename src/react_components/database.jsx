/** @jsx React.DOM */

(function () {
  "use strict";

  Object.assign = Object.assign || require('object.assign');
  var React = require('react/addons');
  var Router = require('react-router');
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;
  var _ = require('lodash');

  var TableStore = require('../stores/table_store');
  var TableActions = require('../actions/table_actions');

  var Database = React.createClass({
    mixins: [Router.State],

    getInitialState: function() {
      return {
        tables: TableStore.getTables()
      };
    }, // getInitialState


    /**
     * Get tables from store and and return
     * what is to be put in state
     * @return {object}
     */
    getStateFromStore: function() {
      return {
        tables: TableStore.getTables()
      };
    },


    /**
     * Sets state > tables from store
     */
    updateTables: function() {
      this.setState(this.getStateFromStore());
    },


    /**
     * Subscribe to events before component actually mounts
     */
    componentWillMount: function() {
      TableStore.addChangeListener(this.updateTables);
    },


    /**
     * Retrieve tables from store/database when component mounts
     */
    componentDidMount: function() {
      TableActions.retrieveTablesForDatabase(this.getParams().database);
    },


    /**
     * Remove subscribtion when component
     */
    componentWillUnmount: function() {
      TableStore.removeChangeListener(this.updateTables);
    },

    componentWillReceiveProps: function() {
      TableActions.retrieveTablesForDatabase(this.getParams().database);
    },



    /**
     * Build dom elements for each row in the tables list
     * @return {array} of react elements
     */
    tablesDOM: function() {
      var cx = React.addons.classSet;
      return _.sortBy(Object.keys(this.state.tables)).map(function(table) {
        var active = this.getParams().table && this.getParams().table == table;

        var rowClasses = cx({
          success: active
        });

        return (
          <tr className={rowClasses} key={table}>
            <td>
              <Link to="table" params={{database: this.getParams().database, table: table}}>
                {table}
              </Link>
            </td>
          </tr>
        );
      }.bind(this));
    },

    render: function() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2">

              <div className="panel panel-success">
                <div className="panel-heading">
                  Tables
                </div>

                <div className="table-responsive table-list-container">
                  <table className="table-list-table table table-condensed table-hover">
                    <tbody>
                      {this.tablesDOM()}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
            <div className="col-xs-10">
              <RouteHandler {...this.props}/>
            </div>
          </div>
        </div>
      );

    }

  });

  module.exports = Database;
}());
