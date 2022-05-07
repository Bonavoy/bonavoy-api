import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { getAccessToken } from '../utils/amadeus';

dotenv.config();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const params = req.query;

  const paramsArray = [];
  for (const [key, value] of Object.entries(params)) {
    if (value && value !== '') {
      paramsArray.push(`${key}=${value}`);
    }
  }

  const paramString = paramsArray.join('&');

  // get access token
  const access_token = await getAccessToken();

  const { data: hotels } = await axios.get(
    `${process.env.AMADEUS_BASE_URL}/reference-data/locations/hotels/by-city?${paramString}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return res.send(hotels);
});

export default router;
