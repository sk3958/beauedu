/*var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})*/

const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'leesk',     
    password: 'leesk?239',
    database: 'BEAU-EDU',
    port: 5432
};

const client = new pg.Client(config);

queryDatabase = function()
{
	const query = `select array_to_json(array_agg(bu)) as file_data from (select user_name, user_id from public."BeauUser" where user_id = 'test') bu`;
	client.query(query)
		.then(res => {
			const rows = res.rows;
			console.log(rows[0].file_data);
  process.exit()
		})
		.catch(err => {
			console.log(err);
		});
};

(async () => {
console.log('before')
  await client.connect()
console.log('after')
  queryDatabase()
})()

