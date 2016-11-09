/**
 * Connection기능을 사용하여 database 연결 기능 구현
 * <pre>
 * input : none
 * output : none
 * Table : none
 * </pre>
 *
 * <pre>
 * <b>History:</b>
 *    김만기, 1.0, 2016.11.04 초기작성
 * </pre>
 *
 * @author 김만기
 * @version 1.0, 2016.11.06주석 추가
 * @see    None
 */


var mysql = require('mysql'); // mysql 모듈을 불러오고
/*database 연결을 위한 Pool생성 여기서 Pool이란 db 연결 정보를 뜻한다*/
var pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'1111',
  database:'skhudb'
});


module.exports = pool;
