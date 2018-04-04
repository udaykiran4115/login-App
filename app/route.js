var User = require('./user')

module.exports= function(app, passport){
  app.get('/', function(req, res){
    res.render('index.ejs')
  })

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { messages: req.flash('signupMessage')})
  })

//post without passport
/*  app.post('/signup', function(req, res){
    var newUser = new User();
    newUser.local.username = req.body.email;
    newUser.local.password = req.body.password;
    console.log(newUser.local.username + " " + newUser.local.password)
    newUser.save(function(err){
      if(err) throw err;
    })
    res.redirect('/dashboard')
  })*/

//post with passport
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect:'/dashboard',
    failureRedirect:'/signup',
    failureFlash: true
  }))

  app.get('/login', function(req, res){
    res.render('login.ejs', { messages: req.flash('loginMessage')})
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
  }))

  app.get('/dashboard', isLoggedIn, function(req, res){
    //res.render('signup.ejs', { messages: 'correct'})
    res.send("You are in DashBoard page...")
    res.render('profile.ejs', { user : req.user})
  })

  app.get('/:username/:password', function(req, res){
    var newUser = new User();
    newUser.local.username = req.params.username;
    newUser.local.password = req.params.password;
    console.log(newUser.local.username + " " + newUser.local.password)
    newUser.save(function(err){
      if(err) throw err;
    })
    res.send('Success...')
  })

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  })
}

function isLoggedIn(req, res, next){
  if (req.isAuthenticated){
    return next();
  }
  res.redirect('/login');
}
