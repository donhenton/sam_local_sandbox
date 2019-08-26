const pg = require('pg');
//postgresql://dbuser:secretpassword@database.server.com:5432/jdatabase
function getOfficeDao(connString) {


  let officeDao = {
    getOffices: async function () {

      var client = new pg.Client(connString);
      client.connect();
      const result = await client.query("SELECT * from offices;");
      const jsonString = JSON.stringify(result.rows);
      const jsonObj = JSON.parse(jsonString);
      await client.end()
      return jsonObj;
  


    }

  };
  return officeDao;

}
module.exports = getOfficeDao;