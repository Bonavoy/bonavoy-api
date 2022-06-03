import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.send('something');
});

router.get('/', (req, res) => {});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

export default router;
