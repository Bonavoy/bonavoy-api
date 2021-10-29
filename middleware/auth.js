import fs from 'fs';
import jwt from 'jsonwebtoken';

const secret = fs.readFileSync('secret.key');

export const validateToken = (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    return res.status(403).send({
      error: true,
      message: 'No token provided.',
    });
  }

  jwt.verify(
    accessToken,
    secret,
    { algorithms: 'RS256' },
    function (err, decoded) {
      console.log(err);
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: 'Unauthorized access.' });
      }
      req.decoded = decoded;
      next();
    }
  );
};
