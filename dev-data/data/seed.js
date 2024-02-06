const fs = require('fs');
const mongoose = require('mongoose');

const Tour = require('./../../models/tourModel');

require('dotenv').config({path : './../../.env'});



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
  const data = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));
  try {
    await Tour.create(data);
    console.log('data added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Tour.deleteMany();
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
