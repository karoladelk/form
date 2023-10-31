const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Update the MongoDB connection string
const connectionString = "mongodb+srv://contracktrial:B045ojT7Ha9tLIY5@form.ndkf87o.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  termsCheckbox: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/Imgs', express.static(__dirname + '/Imgs'));
app.use('/', express.static(__dirname + '/')); // Include the trailing slash

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/", async (req, res) => {
  try {
    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      termsCheckbox: req.body.termsCheckbox === 'true',    });
    await newUser.save();
    res.redirect('/success.html');
  } catch (error) {
    console.error("Error in POST request:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 5503;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
