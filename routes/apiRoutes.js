var db = require("../models");
var geolib = require("geolib");

module.exports = function(app) {
  // Get all examples
  app.get("/", function(req, res) {
    // var location1 = { latitude: 30.267140, longitude: -97.743076 };
    // var location2 = { latitude: 30.278935, longitude: -97.736108 };
    // var distance = geolib.getDistance(location1, location2);
    // var miles = (distance * 0.000621371).toFixed(2);
    // res.json(miles + " miles");
  });

  app.put("/api/filter", function(req, res) {
    console.log(req.body);
    db.Meetup.findAll({}).then(function(locations) {
      var coords = req.body.location.split(",");
      var location1 = {
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1])
      };
      var distanceArray = [];
      for (i in locations) {
        var location2 = {
          latitude: locations[i].latitude,
          longitude: locations[i].longitude
        };
        var distance = geolib.getDistance(location1, location2);
        var miles = (distance * 0.000621371).toFixed(2);
        if (miles <= req.body.distance) {
          distanceArray.push(locations[i]);
        }
      }
      res.json(distanceArray);
    });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/meetup", function(req, res) {
    db.Meetup.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/user", function(req, res) {
    db.User.update(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/meetup", function(req, res) {
    db.Meetup.update(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });



  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
