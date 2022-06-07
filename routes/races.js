var express = require('express');
var router = express.Router();
var dbo = require('./../server/db/conn');




/* GET races listing. */
router.get('/', function(req, res, next) {

  const dbConnect = dbo.getDb('test-jaskonio');

  const matchDocument = {
    name: "jonatan"
  };

  dbConnect
    .collection("carrera_1")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        console.log(err)        
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
      }
    });

  res.send('respond with a resource races');
});

module.exports = router;
