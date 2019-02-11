var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //Just for testing
  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname, "../test/findmore.html"));
  });

  app.get("/findGame", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/findGame.html"));
  });

  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  // Load example page and pass in an example by id
  // app.get("/findGame/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("findGame", {
  //       example: dbExample
  //     });
  //   });
  // });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  app.get("/find", function(req, res) {
    res.render("findGame");
  });
};
