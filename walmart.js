var Hapi = require('hapi');

// Create the Walmart Labs Hapi Server
var PORT = process.env.PORT || 8000;
var server = new Hapi.Server();
var pg = require('pg');
server.connection({ port: PORT });

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: './public',
      listing: false,
      index: true
    }
  }
});

server.route({
  method: 'GET',
  path: '/databases',
  handler: function (request, reply) {
    var conString = 'postgres:://colevoss:pass@localhost/postgres';

    var pgClient = new pg.Client({
      user: 'colevoss',
      password: 'pass',
      database: 'postgres',
      host: 'localhost'
    });

    pgClient.connect();
    pgClient.on('drain', pgClient.end.bind(pgClient));

    var query = pgClient.query(
      'SELECT *, pg_encoding_to_char(pg_database.encoding) as _encoding FROM pg_database WHERE datistemplate = false'
    );

    var databases = []
    query.on('row', function(row, result) {
      result.addRow(row)
    });

    query.on('end', function(result) {
      console.log('Succesfully retrieved databases!');
      reply(result.rows)
    });

  }

});

server.route({
  method: 'GET',
  path: '/databases/{name}',
  handler: function (request, reply) {
    var database = request.params.name
    var pgClient = new pg.Client({
      user: 'colevoss',
      password: 'pass',
      database: database,
      host: 'localhost'
    });

    pgClient.connect();
    pgClient.on('drain', pgClient.end.bind(pgClient));

    //var query = pgClient.query(
      //"select * from information_schema.tables WHERE table_schema = 'public' AND table_catalog = $1",
      //[database]
    //);

    var query = pgClient.query("SELECT * from information_schema.columns WHERE table_schema='public' ORDER BY ordinal_position ASC");

    query.on('error', function(error) {
      console.log(error);
    });

    var tables = {};
    query.on('row', function(row, result) {

      if ( Object.keys(tables).indexOf(row.table_name) === -1) {
        tables[row.table_name] = [row]
      } else {
        tables[row.table_name].push(row)
      }
      //result.addRow(row)
    });


    query.on('end', function(result) {
      console.log('Succesfully retrieved tables for %s!', database);
      reply(tables);
    });
  }
});

server.route({
  method: 'GET',
  path: '/databases/{db}/{table}/data',
  handler: function (request, reply) {
    var database = request.params.db;
    var table = request.params.table;
    var pgClient = new pg.Client({
      user: 'colevoss',
      password: 'pass',
      database: database,
      host: 'localhost'
    });

    pgClient.connect();
    pgClient.on('drain', pgClient.end.bind(pgClient));

    var queryString = 'SELECT * FROM ' + table + ' LIMIT 100';

    var query = pgClient.query(queryString);

    query.on('error', function(error) {
      console.log(error);
    });

    query.on('row', function(row, result) {
      result.addRow(row)
    });

    query.on('end', function(result) {
      console.log('Succesfully retrieved data for %s!', table);
      reply(result.rows)
    });
  }
});

// Start your Mullet Server
server.start(function () {
  console.log('The Mullet Stack is running on port:', PORT);
});


// SELECT * FROM pg_database WHERE datistemplate = false; GET DATABASES
// select * from pg_user; GET USERS
// select table_schema, table_name from information_schema.tables order by table_schema, table_name GET TABLES IN DATABASE
