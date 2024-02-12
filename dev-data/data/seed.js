const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

require('dotenv').config({ path: './../../.env' });

const mongoDB = process.env.MONGODB_LOCAL_URL;

connectDB();

async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
  }
}

async function createData() {
  const tours = JSON.parse(fs.readFileSync('./tours.json', 'utf-8'));
  const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
  const reviews = JSON.parse(fs.readFileSync('./reviews.json', 'utf-8'));
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] == 'i' || process.argv[2] === 'import') {
  createData();
} else if (process.argv[2] == 'd' || process.argv[2] === 'delete') {
  deleteData();
}
