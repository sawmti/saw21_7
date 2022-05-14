import { getConnection } from "../database.js";
import https from 'https';


export const getExoplanets = (req, res) => {
  const exoplanets = getConnection().data.exoplanets;
  res.json(exoplanets);
};

export const createExoplanet = async (req, res) => {
  const newExoplanet = {
    id: req.body.id,
    name: req.body.name,
    discoverer: req.body.discoverer,
    image: req.body.image
  };

  try {
    const db = getConnection();
    db.data.exoplanets.push(newExoplanet);
    await db.write();

    res.json(newExoplanet);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getExoplanet = (req, res) => {
  const exoplanetFound = getConnection().data.exoplanets.find((exo) => exo.id === req.params.id);
  if (!exoplanetFound) res.sendStatus(404);
  res.json(exoplanetFound);
};

export const updateExoplanet = async (req, res) => {
  const { name, discoverer,image } = req.body;

  try {
    const db = getConnection();
    const exoplanetFound = db.data.exoplanets.find((exo) => exo.id === req.params.id);
    if (!exoplanetFound) return res.sendStatus(404);
    
    exoplanetFound.id = req.params.id;
    exoplanetFound.name = name;
    exoplanetFound.discoverer = discoverer;
    exoplanetFound.image = image;

    db.data.exoplanets.map((exo) => (exo.id === req.params.id ? exoplanetFound : exo));

    await db.write();

    res.json(exoplanetFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteExoplanet = async (req, res) => {
  const db = getConnection();
  const exoplanetFound = db.data.exoplanets.find((exo) => exo.id === req.params.id);
  if (!exoplanetFound) res.sendStatus(404);

  const newExoplanets = db.data.exoplanets.filter((exo) => exo.id !== req.params.id);
  db.data.exoplanets = newExoplanets;
  await db.write();

  return res.json(exoplanetFound);
};

export const count = async (req, res) => {
  const totalExoplanets = getConnection().data.exoplanets.length;
  res.json(totalExoplanets);
};

export const getWikiDataExoplanets = async (req, res) => {
   const queryParams = new URLSearchParams(
    [['query', `SELECT DISTINCT ?exoplaneta ?dicovererLabel ?exoplanetaLabel ?image ?link WHERE {
      ?exoplaneta wdt:P31 wd:Q44559.
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
      //const bindings = json.results.bindings;
      //const label = bindings.length > 0 ? bindings[0].label.value : 'Not found';
      res.send(json);
    });
  }).on('error', err => {
    console.log('Error: ', err.message);
  })
};


export const getWikiDataExoplanet = async (req, res) => {
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
     //const bindings = json.results.bindings;
     //const label = bindings.length > 0 ? bindings[0].label.value : 'Not found';
     res.send(json)
   });
 }).on('error', err => {
   console.log('Error: ', err.message);
 })
};