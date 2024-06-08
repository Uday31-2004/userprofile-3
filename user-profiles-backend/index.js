const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ObjectId } = require('mongoose').Types;

dotenv.config(); // Load environment variables from .env file

const usersData = require('./users.json'); // Import user data

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin:["https://userprofile-gules.vercel.app/"],
    methods:["POST", "GET"],
    credentials: true
  }
));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://udayb3122:rklf2ZLuVyDHTdcG@cluster0.dzxkzb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  
}).then(() => {
  console.log('MongoDB connected');

  // Define the User schema and model
  const userSchema = new mongoose.Schema({
    id: {
      type: ObjectId,
      required: true,
      unique: true,
    },
    username: String,
    name: String,
    email: String,
    phone: String,
    website: String,
    address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
    },
    company: {
      name: String,
    }
  });

  const User = mongoose.model('User', userSchema);

  // Check if the database is empty and seed it if necessary
  User.countDocuments().then(async (count) => {
    if (count === 0) {
      try {
        await User.insertMany(usersData);
        console.log('Data successfully seeded');
      } catch (seedErr) {
        console.log(seedErr);
      }
    } else {
      console.log('Data already exists, no seeding necessary');
    }
  }).catch(err => {
    console.log(err);
  });

  // Routes
  app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.log(err);
});
