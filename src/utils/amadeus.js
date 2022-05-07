import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');
params.append('client_id', process.env.AMADEUS_API_KEY);
params.append('client_secret', process.env.AMADEUS_API_SECRET);

/**
 * get amadeus access token to do requests and stuff
 * @returns Promise
 */
export const getAccessToken = async () => {
  // todo: need to cache token and time to refresh access token
  const { data } = await axios.post(
    `${process.env.AMADEUS_BASE_URL}/security/oauth2/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return data.access_token;
};
