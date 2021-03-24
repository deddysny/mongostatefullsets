// 1. init replication set
rs.initiate( {
  _id : "rs0",
  members: [ { _id : 0, host : "mongodb-0.mongodb" } ]
});
// 2. create cluster admin
use admin;
db.createUser({
  user:"admin",
  pwd:"admin",
  roles: [
      {role: "userAdmin", db:"admin"},
      {role: "clusterAdmin", db: "admin"}
  ]
});

// 3. login with cluster admin user
db.auth("admin", "admin");
// 3. add slave nodes
rs.add("mongodb-1.mongodb");
rs.add("mongodb-2.mongodb");
db.runCommand('isMaster');

// 4. create database user
db.createUser({
    user: "test",
    pwd: "test",
    roles: [
        { role: "readWriteAnyDatabase", db: "admin" }
    ]
});
