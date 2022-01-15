var express = require('express')
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var multer = require('multer');
var mysql = require('mysql');
var app = express();

//Node MySqlAdmin init--------------------------
// var mysqlAdmin = require('node-mysql-admin');
// app.use(mysqlAdmin(app));
//------------------------------------------------

//See db_connection.js-------------------------------------
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'leton1cdream',
//   database: 'sys'
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('MySql Connected!');
// });
//------------------------------------------------

//BodyParser Middleware
app.use(bodyParser.urlencoded({parameterLimit: 100000, limit: '50mb', extended: true}));
app.use(bodyParser.json({type: 'application/json', parameterLimit: 100000, limit: '50mb', extended: true}));
app.use(cookieParser());
//app.use(multer({dest:'./public/uploads/'}).single('mailingFile'));


var routes = require('./routes/index');

//View Engine 
app.set('views', path.join(__dirname, 'views') );
app.engine('handlebars', exphbs({
	defaultLayout: 'layout.handlebars',
	partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/assets/')));

app.use(flash(app));	

app.use('/', routes);

var port = 777
app.listen(port, () => console.log(`3dWorlds! listening on port ${port}!`));
