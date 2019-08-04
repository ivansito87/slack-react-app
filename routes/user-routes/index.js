
module.exports = function (app) {
  app.get("/user", (req, res) => {
    res.json({name: "Bob", message: "Testing route"});
  })
};