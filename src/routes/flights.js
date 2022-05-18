import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * /flights/search:
 *   post:
 *      tags:
 *         - Flights
 *      summary: Provides a list of flight offers
 *      description: Using certain options, a list of flights will be provided
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  originLocationCode:
 *                    type: string
 *                    description: an airport code
 *                    example: YEG
 *                  destinationLocationCode:
 *                    type: string
 *                    description: an airport code
 *                    example: YYZ
 *                  departureDate:
 *                    type: string
 *                    description: string date
 *                    example: 2022-11-01
 *                  returnDate:
 *                    type: string
 *                    description: string date
 *                    example: 2022-12-01
 *                  adults:
 *                    type: number
 *                    description: number of travellers
 *                    example: 1
 *                  children:
 *                    type: number
 *                    description: number of travellers
 *                    example: 1
 *                  infants:
 *                    type: number
 *                    description: number of travellers
 *                    example: 1
 *                  travelClass:
 *                    type: string
 *                    description: number of travellers
 *                    enum: [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST]
 *                  currencyCode:
 *                    type: string
 *                    description: the preferred currency for the flight offers. Currency is specified in the ISO 4217 format
 *                    example: CAD
 *                  nonStop:
 *                    type: boolean
 *                    description: if set to true, the search will find only flights going from the origin to the destination with no stop in between
 *                  maxResults:
 *                    type: number
 *                    description: number of results to return
 */
router.post('/search', async (req, res, next) => {
  try {
    const flightsRequest = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${req.body.originLocationCode}&destinationLocationCode=${req.body.destinationLocationCode}&departureDate=${req.body.departureDate}&returnDate=${req.body.returnDate}&adults=${req.body.adults}&children=${req.body.children}&infants=${req.body.infants}&travelClass=${req.body.travelClass}&nonStop=${req.body.nonStop}&currencyCode=${req.body.currencyCode}&max=${req.body.maxResults}`;
    const access_token = await getAccessToken();

    const test = await axios.get(flightsRequest, {
      headers: {
        accept: 'application/vnd.amadeus+json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.status(201).send(test.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
