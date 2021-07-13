import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
  return res.send('signup');
});

router.post('/login', (req, res) => {
  return res.send('login');
});

export default router;
