const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { ObjectId } = require("mongoose").Types;

dotenv.config();

const usersData = require("./users.json");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  "mongodb+srv://udayb3122:rklf2ZLuVyDHTdcG@cluster0.dzxkzb3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  app.use(cors(
    {
      origin:["https://userprofile-3.vercel.app/"],
      methods:["POST", "GET"],
      credentials: true
    }
  ));
  
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log("MongoDB connected");

    const userSchema = new mongoose.Schema({
      id: {
        type: String,
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
      },
    });

    const User = mongoose.model("User", userSchema);

    // Inside the `then` block where data seeding is performed
    User.countDocuments()
      .then(async (count) => {
        if (count != 0) {
          try {
            await User.insertMany(usersData);
            console.log("Data successfully seeded");
          } catch (seedErr) {
            console.log(seedErr);
          }
        } else {
          console.log("Data already exists, no seeding necessary");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Routes
    app.get("/api/users", async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.post("/api/users", async (req, res) => {
      const user = new User(req.body);
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });
    app.use((req, res) => {
      res.status(404).json({ message: "Not Found" });
    });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
