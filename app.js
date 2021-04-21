

// express app
const express = require('express');
const app = express();

// other libaries
require('dotenv/config');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");   // cross-origin resource sharing



// Connect to DB

// require routers
const apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middlewares?
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use('/api', apiRouter);     // api
app.use('/static', express.static(path.join(__dirname, './build/static')));
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './build/')} );
});
//app.use('/react', reactRouter);  // api 
//app.use(express.static(path.join(__dirname, 'build')));



// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@aluminus.t8urj.mongodb.net/Aluminus?retryWrites=true&writeConcern=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB");

    });

// Connection handling
const conn = mongoose.connection;
conn.on('error', err => console.error('Failed to connec to DB on startup ', err));
conn.on('disconnected', () => console.log('Mongoose default connection to DB disconnected'));

const gracefulExit = () => {
  conn.close(() => {
    console.log('Mongoose default connection with DB is disconnected through app termination');
    process.exit(0);
  })
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
