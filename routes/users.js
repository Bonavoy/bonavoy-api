import express from 'express';
import * as crud from '../database/crud/user';

const router = express.Router();

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
