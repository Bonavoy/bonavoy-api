import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * /locations/suggestions:
 *   post:
 *      tags:
 *         - Locations
 *      summary: Provides a list of suggested locations
 *      description: Using certain options, a list of locations will be provided
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  query:
 *                    type: string
 *                    description: a location name or anything else
 *                    example: Calgary
 *                  types:
 *                    type: array
 *                    description: feature type
 *                    enum: [place, postcode, address, country, region, district, locality, poi, neighborhood]
 *                    example: ['place', 'postcode']
 *                  proximity:
 *                    type: array
 *                    description: bias around location
 *                    enum: [ip, coordinate, none]
 *                    example: ['ip', 'coordinate']
 *                  countries:
 *                    type: array
 *                    description: country in short name
 *                    example: ['ca']
 */
router.post('/suggestions', async (req, res, next) => {
  try {
    // set query params
    const config = {
      params: {
        access_token: process.env.MAPBOX_ACCESS_TOKEN,
        types: req.body.types.join(','),
        country: req.body.country.join(','),
        proximity: req.body.proximity.join(','),
      },
    };

    const geocodingRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.query}.json`;

    return res
      .status(201)
      .send((await axios.get(geocodingRequest, config)).data.features);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/suggestionss', async (req, res, next) => {
  try {
    const { data: suggestions } = await axios.get(
      `${process.env.AIRLABS_BASE_URL}/suggest?q=${req.query.query}&api_key=${process.env.AIRLABS_API_KEY}`
    );
    console.log(suggestions.response);
    return res.send();
  } catch (err) {
    // console.log(err);
    next(err);
  }
});

export default router;
