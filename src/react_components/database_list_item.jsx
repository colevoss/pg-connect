/** @jsx React.DOM */

(function () {
  "use strict";

  var React = require('react');
  var Router = require('react-router');
  var Link = Router.Link;

  //var DatabaseStore = require('../stores/database_store');
  var DatabaseActions = require('../actions/database_actions');

  var DatabaseListItem = React.createClass({

    render: function () {
      return (
        <Link
          to="database"
          params={{database: this.props.data.datname}}
          className="database-item list-group-item"
          key={this.props.data.datname}
        >

          <div className="row-action-primary">
            <i className="mdi-file-folder"/>
          </div>

          <div className="row-content">

            <h4 className="list-group-item-heading">{this.props.data.datname}</h4>
            <div className="list-group-item-text">
              <span className="col-md-4 col-xs-12 col-sm-6">
                Encoding: {this.props.data._encoding}
              </span>
              <span className="col-md-4 col-xs-12 col-sm-6">
                Connection Limit: {this.props.data.datconnlimit}
              </span>
              <span className="col-md-4 col-xs-12 col-sm-6">
                Template: {this.props.data.datistemplate ? 'True' : 'False'}
              </span>
            </div>

          </div>

        </Link>
      );
    }
  });

  module.exports = DatabaseListItem;
}());
