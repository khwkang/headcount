module.exports = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'admin2',
    password : 'admin',
    database : 'headcount',
    charset  : 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  }
});