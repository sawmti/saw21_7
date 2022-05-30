const dbo = require('../database.js');
const https = require('https');


const getExoplanets = (req, res) => {
const dbConnect = dbo.getDb();

  dbConnect
    .collection('exoplaneta')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching exoplanetas!');
      } else {
        res.json(result);
      }
    });
};

const createExoplanet = async (req, res) => {
  const dbConnect = dbo.getDb();
  const newExoplanet = {
    id: req.body.id,
    name: req.body.name,
    discoverer: req.body.discoverer,
    image: req.body.image,
    wiki: req.body.wiki
  };

  dbConnect
  .collection('exoplaneta')
  .insertOne(newExoplanet, function (err, result) {
    if (err) {
      res.status(400).send('Error inserting exoplaneta!');
    } else {
      console.log(`Added a new exoplaneta with id ${result.insertedId}`);
      res.json({message : 'OK'});
    }
  });
};

const getExoplanet = (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('exoplaneta')
    .find({id: req.params.id})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching exoplaneta!');
      } else {
        res.status(200).json({"status":"ok" , "exoplaneta": result[0]});
      }
    });
};

const updateExoplanet = async (req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { id: req.body.id };
  const uptExoplanet = { $set: {
    name: req.body.name,
    discoverer: req.body.discoverer,
    image: req.body.image,
    wiki: req.body.wiki
  }};
  console.log(listingQuery);
  console.log(uptExoplanet);
  dbConnect
    .collection('exoplaneta')
    .updateOne(listingQuery, uptExoplanet, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating likes on exoplaneta with id ${listingQuery.id}!`);
      } else {
        console.log('1 exoplaneta updated');
        res.json({message : 'OK'});
      }
    });

};

const deleteExoplanet = async (req, res) => {
  const dbConnect = dbo.getDb();
  const listingQuery = { id: req.body.id };

  dbConnect
    .collection('exoplaneta')
    .deleteOne(listingQuery, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error deleting exoplaneta with id ${listingQuery.id}!`);
      } else {
        console.log('1 exoplaneta deleted');
        res.json({message : 'OK'});
      }
    });
};

const countExoplanetas = async (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('exoplaneta')
    .countDocuments(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching exoplaneta!');
      } else {
        res.json({count : result});
      }
    });
};

const existeExoplaneta = async (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('exoplaneta')
    .find({id: req.params.id})
    .count(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching exoplaneta!');
      } else {
        res.json({count : result});
      }
    });
};

const getWikiDataExoplanets = async (req, res) => {
   const queryParams = new URLSearchParams(
    [['query', `SELECT DISTINCT ?exoplaneta ?dicovererLabel ?exoplanetaLabel ?image ?link WHERE {
      ?exoplaneta wdt:P31 wd:Q44559.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      ?exoplaneta wdt:P18 ?image.
      ?exoplaneta wdt:P61 ?dicoverer.
      ?link schema:about ?exoplaneta.
      ?link schema:isPartOf <https://es.wikipedia.org/>.} ORDER BY DESC (?exoplaneta)`],
    ['format', 'json']
    ]).toString();
  const options = {
    hostname: 'query.wikidata.org',
    port: 443,
    path: `/sparql?${queryParams}`,
    method: 'GET',
    headers: { 'User-Agent': 'Example/1.0' }
  }
  https.get(options, httpres => {
    let data = [];
    httpres.on('data', chunk => {
      data.push(chunk);
    });
    httpres.on('end', () => {
       const result = Buffer.concat(data).toString();
      const json = JSON.parse(result);
      res.send(json);
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
};


const getWikiDataExoplanet = async (req, res) => {
  const queryParams = new URLSearchParams(
   [['query', `SELECT DISTINCT ?exoplaneta ?dicovererLabel ?exoplanetaLabel ?image ?link WHERE {
     ?exoplaneta wdt:P31 wd:Q44559.
     FILTER(?exoplaneta = wd:${req.params.id})
     SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
     ?exoplaneta wdt:P18 ?image.
     ?exoplaneta wdt:P61 ?dicoverer.
     ?link schema:about ?exoplaneta.
     ?link schema:isPartOf <https://es.wikipedia.org/>.}`],
   ['format', 'json']
   ]).toString();
 const options = {
   hostname: 'query.wikidata.org',
   port: 443,
   path: `/sparql?${queryParams}`,
   method: 'GET',
   headers: { 'User-Agent': 'Example/1.0' }
 }
 https.get(options, httpres => {
   let data = [];
   httpres.on('data', chunk => {
     data.push(chunk);
   });
   httpres.on('end', () => {
      const result = Buffer.concat(data).toString();
     const json = JSON.parse(result);
     res.status(200).send(json);
   });
 }).on('error', err => {
   console.log('Error: ', err.message);
 })
};

module.exports = { getExoplanets,
                  getWikiDataExoplanet,
                  getWikiDataExoplanets,
                  createExoplanet,
                  getExoplanet,
                  updateExoplanet,
                  deleteExoplanet,
                  countExoplanetas,
                  existeExoplaneta
                 };