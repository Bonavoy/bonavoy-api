import express from 'express'

const router = express.Router()

router.get('/accept', (req, res) => {
  console.log('what the fuck')
  const code = req.query.code
  if (!code) res.json({ error: 'missing invite code' }).status(400)

  // add to authors table
  // remove from invite table

  // 300 to the trip (/trips/<tripid>/planner)
  res.json('idk')
})

export default router
