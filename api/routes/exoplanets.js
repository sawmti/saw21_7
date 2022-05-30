const Router = require('express');
const router = Router();
const {
  getExoplanets,
  getWikiDataExoplanet,
  getWikiDataExoplanets,
  createExoplanet,
  getExoplanet,
  updateExoplanet,
  deleteExoplanet,
  countExoplanetas,
  existeExoplaneta
} = require('../controllers/exoplanets.controller.js');

/**
 * @swagger
 * components:
 *  schemas:
 *    Exoplanet:
 *      type: object
 *      required:
 *        - id
 *        - name
 *        - discoverer
 *        - image
 *        - wiki
 *      properties:
 *        id:
 *          type: string
 *          description: id in Wikidata
 *        name:
 *          type: string
 *          description: The exoplanet name
 *        discoverer:
 *          type: string
 *          description: The discoverer of the exoplanet
 *        image:
 *          type: string
 *          description: The image of the exoplanet
 *        wiki:
 *          type: string
 *          description: link to wikipedia
 *      example:
 *        id: Q14624923
 *        name: Kepler-78b
 *        description: Sanchis-Ojeda
 *        image: Kepler-62f_with_62e_as_Morning_Star.jpg
 *        wiki: https://es.wikipedia.org/wiki/Gliese_777_c
 *  parameters:
 *    exoplanetId:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: the exoplanet id
 */

/**
 * @swagger
 * tags:
 *  name: Exoplanets
 *  description: the Exoplanets api
 */

/**
 * @swagger
 * /api/exoplanets:
 *   get:
 *     summary: Returns a list of the Exoplanets
 *     tags: [Exoplanets]
 *     responses:
 *       200:
 *        description: the list of Exoplanets
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Exoplanet'
 */

router.get("/api/exoplanets", getExoplanets);

/**
 * @swagger
 * /api/exoplanets/count:
 *  get:
 *    summary: get the total number of exoplanets
 *    tags: [Exoplanets]
 *    responses:
 *      200:
 *        description: the total exoplanets
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 10
 */

router.get("/api/exoplanets/count", countExoplanetas);

/**
 * @swagger
 * /api/exoplanets/:id:
 *  get:
 *    summary: Get a Exoplanets by Id
 *    tags: [Exoplanets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The exoplanet id
 *    responses:
 *      200:
 *        description: the Exoplanets description by Id
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exoplanet'
 *      404:
 *        description: the exoplanet does not found
 */
router.get("/api/exoplanets/:id", getExoplanet);

/**
 * @swagger
 * /api/exoplanets/create:
 *  post:
 *    summary: create a new exoplanets
 *    tags: [Exoplanets]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Exoplanet'
 *    responses:
 *      200:
 *        description: the exoplanet was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exoplanet'
 *      500:
 *        description: Some server error
 */
router.post("/api/exoplanets/create", createExoplanet);

/**
 * @swagger
 * /api/exoplanets/update:
 *  put:
 *    summary: update a task by the id
 *    tags: [Exoplanets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the exoplanet id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Exoplanet'
 *    responses:
 *      200:
 *        description: the exoplanet was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exoplanet'
 *      404:
 *        description: the exoplanet was not found
 *      500:
 *        description: some server error
 */
router.put("/api/exoplanets/update", updateExoplanet);

/**
 * @swagger
 * /api/exoplanets/delete:
 *  delete:
 *    summary: delete a exoplanet by id
 *    tags: [Exoplanets]
 *    parameters:
 *      - $ref: '#/components/parameters/exoplanetId'
 *    responses:
 *      200:
 *        description: the exoplanet was deleted
 *      404:
 *        description: the exoplanet was not found
 *
 */

router.delete("/api/exoplanets/delete", deleteExoplanet);


/**
 * @swagger
 * /api/exoplanets/existe/:id:
 *  get:
 *    summary: get exoplanets exists 
 *    tags: [Exoplanets]
 *    responses:
 *      200:
 *        description: existe exoplaneta
 *        content:
 *          text/plain:
 *            schema:
 *              type: integer
 *              example: 10
 */
router.get("/api/exoplanets/existe/:id", existeExoplaneta);

/**
 * @swagger
 * /api/wikidata/exoplanets:
 *   get:
 *     summary: Returns a list of the Exoplanets from Wikidata
 *     tags: [Exoplanets]
 *     responses:
 *       200:
 *        description: the list of Exoplanets from wikidata
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/Exoplanet'
 */

 router.get("/api/wikidata/exoplanets", getWikiDataExoplanets);

 /**
 * @swagger
 * /api/wikidata/exoplanets/{id}:
 *  get:
 *    summary: Get a Exoplanets by Id from Wikidata
 *    tags: [Exoplanets]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *          description: The exoplanet id from Wikidata
 *    responses:
 *      200:
 *        description: the Exoplanets description by Id from WikiData
 *        contens:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Exoplanet'
 *      404:
 *        description: the exoplanet does not found
 */
router.get("/api/wikidata/exoplanets/:id", getWikiDataExoplanet);


module.exports= router;