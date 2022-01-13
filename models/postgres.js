const Pool = require('pg').Pool

//const connectionString = 'postgres://svbcnmxkqzenus:80a3619f1fed81f9f3db7a066412715440c4ed20227b410bd4158b5a19f02de3@ec2-3-230-82-215.compute-1.amazonaws.com:5432/dfmo8c4r9n3r9k?sslmode=no-verify'
//const pool = new Pool({connectionString});

const pool = new Pool({
  user: 'svbcnmxkqzenus',
  host: 'ec2-3-230-82-215.compute-1.amazonaws.com',
  database: 'dfmo8c4r9n3r9k',
  password: '80a3619f1fed81f9f3db7a066412715440c4ed20227b410bd4158b5a19f02de3',  
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = pool;