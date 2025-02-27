const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account')
const authRouter = require('./routes/web/auth')
const authApiRouter = require('./routes/api/auth')


const MongoStore = require('connect-mongo');
const {DBhost,DBname,DBport} = require('./config/config')

const app = express();


app.use(session({
  name  : "sid",
  secret : "TommyLin",
  saveUninitialized : false,
  resave : true,
  store : MongoStore.create({
    mongoUrl : `mongodb://${DBhost}:${DBport}/${DBname}`
  }),
  cookie:{
      httpOnly : true,
      maxAge: 1000* 60 * 60 * 24 * 7
  }

}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api',accountRouter);
app.use('/api',authApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //404頁面
  res.render('404')
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
