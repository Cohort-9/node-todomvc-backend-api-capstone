const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { ToDo } = require('./models');

const app = express();

// app.use(express.static('public'));

// Use cors module or set headers manually
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.json());

app.get('/', function (req, res) {
	// res.json([]);
	ToDo
		.find({})
		.exec()
		.then(results => res.json(results))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'There was an error, check the server logs' });
		});

});

app.post('/', function (req, res) {
	// res.json({ title: req.body.title });
	if (!req.body.title) {
		return res.status(400).send('Missing Title in request body');
	}

	ToDo
		.create({ title: req.body.title })
		.then(results => res.status(201).json(results))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'There was an error, check the server logs' });
		});

});

app.delete('/', function (req, res) {
	// res.json({});
	ToDo
		.remove({})
		.then(results => {
			if (results.result.ok) {
				res.sendStatus(204);
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'There was an error, check the server logs' });
		});

});


// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
				.on('error', err => {
					mongoose.disconnect();
					reject(err);
				});
		});
	});
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
