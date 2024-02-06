const express = require('express');
const morgan = require('morgan');

const CustomError = require('./utils/customError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new CustomError(`${req.originalUrl} NOT FOUND`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
