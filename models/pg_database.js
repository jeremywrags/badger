module.exports = {
    HOST: "ec2-54-235-192-146.compute-1.amazonaws.com",
    USER: "gglmtuzzvizvya",
    PASSWORD: "beda777db61cce6fcec1c7c76031f2dd31692b6f8fdb1458f68b525632b62c70",
    DB: "d80v1u02qukvvj",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    }
  };
