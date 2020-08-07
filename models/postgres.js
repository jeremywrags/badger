const Pool = require('pg').Pool

const pool = new Pool({
  user: 'gglmtuzzvizvya',
  host: 'ec2-54-235-192-146.compute-1.amazonaws.com',
  database: 'd80v1u02qukvvj',
  password: 'beda777db61cce6fcec1c7c76031f2dd31692b6f8fdb1458f68b525632b62c70',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool;