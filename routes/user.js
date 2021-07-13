import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  return res.send('user');
});

router.get('/', (req, res) => {
  return res.send('user');
});

router.put('/', (req, res) => {
  return res.send('user');
});

router.delete('/', (req, res) => {
  return res.send('user');
});

export default router;
