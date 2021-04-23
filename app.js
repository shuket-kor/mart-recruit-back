// process.env.NODE_ENV = "production";
process.env.NODE_ENV = 'develope';

var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./app/config/logger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '/assets/')));
app.use('/', express.static(path.join(__dirname, '/')));

app.set('baseTitle', '마트협회구인구직');
if (process.env.NODE_ENV == 'develope') {
  app.set('mediaPath', 'http://localhost:3000/pdsData/media');
  app.set('hostName', 'http://localhost:3000');
} else {
  app.set('mediaPath', 'http://192.168.1.28:3000/pdsData/media');
  app.set('hostName', 'http://210.116.118.230:3000');
}

app.use('/', require('./routes/index'));
<<<<<<< HEAD
app.use('/user', require('./routes/users'));
=======
app.use('/mart', require('./routes/mart'));
>>>>>>> 4a5e4fab5f0b20f380d7fb1f7e9dc996aff285e2

app.use(
  morgan('combined', 
    {
      skip: function (req, res) { return res.statusCode < 400 }, // http return 이 에러일때만 출력
      stream: logger.stream // logger에서 morgan의 stream 을 받도록 추가
    }
  )
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
