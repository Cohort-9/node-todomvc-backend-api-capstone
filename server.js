const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.get('/', function(req, res, next) {
  res.json({});
});

app.post('/', function(req, res, next) {
   res.json( {title: req.body.title} );
});

app.listen(process.env.PORT || 8080);

exports.app = app;
