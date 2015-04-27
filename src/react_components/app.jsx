/** @jsx React.DOM */

(function () {
  'use strict';

  Object.assign = Object.assign || require('object.assign');

  var React = require('react');

  var Router = require('react-router');
  var Link = Router.Link;
  var Route = Router.Route;
  var RouteHandler = Router.RouteHandler;

  var DatabaseStore = require('../stores/database_store');
  var _ = require('lodash');

  var App = React.createClass({
    getInitialState: function() {
      return {};
    },


    render: function() {
      return (
        <div className="container-fluid">
          <div className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">

              <div className="navbar-header">
                <Link to="app" className="navbar-brand">pg-Connect</Link>
              </div>

              <div className="navbar-collapse collapse navbar-responsive-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to='databases'>Databases</Link>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <RouteHandler {...this.props}/>
        </div>
      );
    }
  });

  module.exports = App;

}());
