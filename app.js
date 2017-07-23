var express = require('express');
var bodyParser =  require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var nav = [{Link: '/Books', text: 'Books'}, {Link: '/Authors', text: 'Authors'}];
var bookRouter = require('./src/routes/bookRouter')(nav);
var adminRouter = require('./src/routes/adminRouter')(nav);
var authRouter = require('./src/routes/authRouter')(nav);

var app = express();
var port = process.env.port || 9000;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
  res.render('index', {title: 'welcome to ejs', nav: nav});
});
app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
