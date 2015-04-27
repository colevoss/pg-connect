/** @jsx React.DOM */

(function () {
  'use strict';

  var React = require('react'),
      App = require('./app.jsx'),
      Router = require('react-router'),
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      DefaultRoute = Router.DefaultRoute;

  var DatabasesPage = require('./databases.jsx');
  var DatabasePage = require('./database.jsx');
  var Table = require('./table.jsx');


  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="databases" handler={DatabasesPage}/>
      <Route name="database" handler={DatabasePage} path="/databases/:database">
        <Route name="table" handler={Table} path=":table"/>
      </Route>
      <DefaultRoute handler={DatabasesPage} />
    </Route>
  );

  Router.run(routes, function(Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.body);
  });


}());
