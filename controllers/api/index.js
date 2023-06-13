const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const seedDbRoute = require("./seedDb");

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/seedDb', seedDbRoute);

module.exports = router;
