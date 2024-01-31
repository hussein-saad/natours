const mongoose = require('mongoose');

require('dotenv').config();
const app = require('./app');

const mongoDB = process.env.MONGODB_URL;

connectDB();

async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
  }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
