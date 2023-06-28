const { Game } = require('../../models');

const router = require('express').Router();

//CRUD

// create game
// POST /api/game
router.post('/', async (req, res) => {
  console.log(req.session);
  const cardsInput = [1,2,3,4,1,2,3,4];
  // copy values into an object as key value pairs where cardindex is the key
  const cards = {};
  cardsInput.forEach( (num, index) => {
    cards["card" + index] = num;
  })
  const results = await Game.create({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    // copy the key values pairs from another object (cards)
    ...cards,
    user_id: req.session.user_id
  });
  res.json(results);
});

module.exports = router;