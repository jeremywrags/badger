const Pool = require('pg').Pool

const connectionString = 'postgres://svbcnmxkqzenus:80a3619f1fed81f9f3db7a066412715440c4ed20227b410bd4158b5a19f02de3@ec2-3-230-82-215.compute-1.amazonaws.com:5432/dfmo8c4r9n3r9k'

const pool = new Pool({connectionString});
/*const pool = new Pool({
  user: 'gglmtuzzvizvya',
  host: 'ec2-54-235-192-146.compute-1.amazonaws.com',
  database: 'd80v1u02qukvvj',
  password: 'beda777db61cce6fcec1c7c76031f2dd31692b6f8fdb1458f68b525632b62c70',  
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})
*/
module.exports = pool;