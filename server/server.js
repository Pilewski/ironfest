var express = require('express')
var app = express()
var bodyParser = require('body-parser');
// const cors = require('express-cors');
var mongoose=require('mongoose');
var fs = require('fs')
const path = require('path');
const MongoClient = require('mongodb').MongoClient

// if(process.env.NODE_ENV === ){
//
// }

if(app.settings.env === "development"){

} else {

}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Get all users
app.get('/users', (request, response) => {
  User.find(function(err, users) {
  if (err) {
    response.send(err)
  }
  response.send({ users: users });
  })
});

app.get('/users/:email', function(req, res) {
  User.findOne({ email: req.params.email}, function(err, user) {
    if (err) {
      res.status(404).send(err)
    }
    res.json(user)
  })
})

// Get all cities
app.get('/cities', (request, response) => {
  City.find(function(err, cities) {
  if (err) {
    response.send(err)
  }
  response.send({ cities: cities });
  })
});

app.get('/cities/:cityID', function(req, res) {
  User.findOne({ _id: req.params.cityID}, function(err, user) {
    if (err) {
      res.status(404).send(err)
    }
    res.json(user)
  })
})

app.post('/users', function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      res.send(err)
    }
    User.find(function(err, users) {
      res.send(users)
    })
  })
})

app.put('/users/:email', function(req,res){
  User.findOne({ email: req.params.email}, function(err, user) {
    if (err) {
     res.send(err)
    }
    // Update the params sent
    for (prop in req.body) {
      user[prop] = req.body[prop]
    }
    // Save the user
    user.save(function(err) {
      if (err) {
        res.send(err)
      }
      res.json({ message: 'User Profile updated!' });
    })
  })
})

app.post('/cities', function(req, res) {
  var city = new City(req.body);
  city.save(function(err) {
    if (err) {
      res.send(err)
    }
    City.find(function(err, cities) {
      res.send(city._id)
    })
  })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
