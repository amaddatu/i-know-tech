const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const seedDbRoute = require("./seedDb");
const gameRoutes = require("./game");

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/seedDb', seedDbRoute);
router.use('/game', gameRoutes);

module.exports = router;
