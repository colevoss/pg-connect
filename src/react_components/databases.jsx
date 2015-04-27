/** @jsx React.DOM */

(function () {
  "use strict";

  var React = require('react');
  var Router = require('react-router');
  var Link = Router.Link;
  var DatabaseListItem = require('./database_list_item.jsx');

  var DatabaseStore = require('../stores/database_store');
  var DatabaseActions = require('../actions/database_actions');

  var Databases = React.createClass({

    databases: function () {
      return DatabaseStore.getAll();
    },

    getInitialState: function () {
      return {databases: this.databases()};
    },

    componentWillMount: function () {
      DatabaseActions.retrieveDatabases();

      DatabaseStore.addChangeListener(this._updateDatabaseState);
    },

    componentWillUnmount: function () {
      DatabaseStore.removeChangeListener(this._updateDatabaseState);
    },

    _updateDatabaseState: function() {
      this.setState( {databases: this.databases()} );
    },

    databaseItems: function() {
      if (!this.state.databases.length) {
        return <div>No Databases to choose from</div>;

      } else {
        return this.state.databases.map(function (db) {

          return (
            <DatabaseListItem data={db}/>
          );

        });

      }
    },

    render: function () {
      return (
        <div className="container-fluid">

          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">

              <div className="panel panel-default">
                <div className="panel-heading text-center">
                  <h1 className="">Databases</h1>
                </div>

                <div className="panel-body">
                  Here is a list of all the databases in your postgres thing.
                </div>

                <div className="list-group">
                  {this.databaseItems()}
                </div>
              </div>

            </div>
          </div>

        </div>
      );
    }
  });

  module.exports = Databases;
}());
