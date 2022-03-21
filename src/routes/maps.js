import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

/**
 * @swagger
 * /maps/suggestions:
 *   post:
 *      tags:
 *         - Maps
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
router.post("/suggestions", async(req, res, next) => {
    try {
        const geocodingRequest = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.query}.json`;
        return res.status(201).json({
            query: geocodingRequest,
        });
    } catch (err) {
        next(err);
    }
});

export default router;