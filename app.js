const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const CustomError = require('./utils/CustomError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  limit: 100,
  windowMs: 15 * 60 * 1000,
  message: 'too many requests, please try again in 15 minutes',
});

app.use(limiter);

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new CustomError(`${req.originalUrl} NOT FOUND`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
