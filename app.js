const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users.route');
const postsRouter = require('./src/routes/posts.route');
const typesRouter = require('./src/routes/types.route');
const authRouter = require('./src/routes/auth.route');

db = require('./src/database');


db.sequelize.sync().then(() => console.log('DB connected')).catch(err => console.log(err));

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/types', typesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({error: 404, message: ":c" })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.status(err.status || 500);
  res.status(500).json({
    message: err.message,
    error: err
});
});

module.exports = app;
