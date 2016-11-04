var mysql=require('mysql');
var connection=require('../../join/connection');

var user={};

user.FindOne = function(id,callback){
  connection.query("select * from user where id=?",[id],function(err, row){
      callback(row[0]);
  });
};

module.exports = user;
