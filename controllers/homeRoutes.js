const router = require('express').Router();
const { Project, User, Reaction, UserReaction } = require('../models');
const withAuth = require('../utils/auth');
const { search } = require('../utils/giphy-api');
const { getQuote } = require('../utils/quote-api');


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Reaction,
          through: UserReaction,
          as: 'project_reactions',
          include: [ {
            
          }]
        },
      ],
    });

    const userData = await User.findAll();

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));

    projects.map(project => {
      project.project_reactions = project.project_reactions.map(pr => {
        const user_id = pr.user_reaction.user_id;
        const user_name = users.filter(user => user.id === user_id)[0];
        if (pr.users) {
          pr.users.push(user_name);
        }
        else {
          pr.users = [];
          pr.users.push(user_name);
        }
        return pr;
      });
      return project;
    });

    console.log(JSON.stringify(projects, null, 2));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/get-quote', async (req, res) => {
  try {
    let quoteData = await getQuote();
    quoteData = quoteData.data.quote;
    console.log("--------");
    // console.log(process.env.API_QUOTE_URL);
    console.log(quoteData);
    console.log("--------");

    res.render('get-quote', {
      quoteData: quoteData
    });
  }
  catch (err) {
    console.log(err);
    res.json({
      message: "You know there was a error right?"
    });
  }
});

router.get('/giphySearch', async (req, res) => {
  try {

    console.log("--------");
    console.log("giphysearch");
    console.log("--------");

    res.render('giphySearch');
  }
  catch (err) {
    console.log(err);
    res.json({
      message: "You know there was a error right?"
    });
  }
});

router.get('/giphySearch/:searchTerm', async (req, res) => {
  try {
    const response = await search(req.params.searchTerm);
    let giphyData = response.data.data;
    giphyData = giphyData.map(imageItem => ({
      alt: imageItem.title,
      url: imageItem.images.fixed_height.url
    }));
    console.log("--------");
    // console.log(JSON.stringify(response.data, null, 2));
    console.log(giphyData);
    console.log("--------");

    res.render('giphySearch', {
      giphyData
    });
  }
  catch (err) {
    console.log(err);
    res.json({
      message: "You know there was a error right?"
    });
  }
});

router.get('/game-page', (req, res) => {
  return res.render('game');
});

module.exports = router;
