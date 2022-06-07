var express = require('express');
var router = express.Router();
var dbo = require('./../server/db/conn');
const axios = require('axios');
const https = require('https');
const request = require('request');


/* GET races listing. */
router.get('/todo', function(req, res, next) {

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

router.get('/carrera_1', function(req, res, next) {
  database_name = 'test-jaskonio'

  GetInfoRanking(database_name, function(err, data) {
    if (err) {
      console.log(err)     
      res.end(err);
    } else {
      console.log(data)        
      //res.end('Se ha añadido el rankins');
      var itemsProcessed = 0;


      data.forEach((item, index, array) => {
        
        collection_name = item.collection_name
        url = item.url
        if (item.enabled === true) {
          SaveRankings(database_name, collection_name, url, function(err, data) {
            if (err) {
              console.log(err)     
              res.end(err);
            } else {
              console.log(data)
            }
          })
        }

        itemsProcessed++;

        if(itemsProcessed === array.length) {
          res.end('Se ha añadido el rankins');
        }
      });

    }
  })


});

function SaveRankings(database_name, collection_name, url, callback) {
  axios.get(url)
  .then(function(response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      
      
    const dbConnect = dbo.getDb(database_name);

    const matchDocument = response.data.data.Rankings

    dbConnect
      .collection(collection_name)
      .insertMany(matchDocument, function (err, result) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
  });
};

function GetInfoRanking(database_name, callback) {
      
    const dbConnect = dbo.getDb(database_name);

    // dbConnect
    //   .collection('lista_carreras')
    //   .find({}, function (err, result) {
    //     if (err) {
    //       callback(err, null);
    //     } else {
    //       console.log(result.name);
    //       callback(null, result);
    //     }
    //   });
    dbConnect
      .collection('lista_carreras')
      .find({}).toArray(function(err, result) {
        if (err) {          
          callback(err, null);
        } else {
          console.log(result.name);
          callback(null, result);
        }        
      });
};


module.exports = router;
