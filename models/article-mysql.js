const mysql = require('mysql')

const pool = mysql.createPool({
	poolLimit: 5,
	host: '35.240.209.52',
	user: 'root',
	password: 'pDe8LhmbkAwKiprL',
	database: 'guestbook'
})

pool.getConnection((err, connection) => {
	if (err) {
		console.error(err)
	}
	connection.query(`select * from guestbook.entries`, (err, results, fields) => {
		if (err) {
			console.log(err.message)
		} else {
			console.log(results)
		}
	})

	connection.release()
})

//   pool.end(function(err) {
//     if (err) {
//       return console.error(err);
//     }
//   });
