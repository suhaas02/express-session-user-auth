const express = require('express')
const expressSession = require('express-session')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// const User = require('./models/user')

app.use(expressSession({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

var sessionChecker = (req,res, next) => {
    if(req.session && req.session.sessionChecker)
    {
        next();
    }
    else{
        res.status(401).send('Unauthorized');
    }
};

//injecting middle ware into routes
// app.get('/', sessionChecker, async function(req,res,next){
//     res.redirect('/account')
// })

app.post('/login', async function(req,res,next){
    const name = req.body.name;
    const password = req.body.password;
    if(name === 'suhaas' && password === 'pass')
    {
        req.session.sessionChecker = true;
        console.log("login ok");
    }
    else{
        res.status(401).send("invalid id");
    }
    
})

app.get('/protected', sessionChecker, (req, res) => {
    // Only authenticated users can access this route
    res.send('Protected content');
  });

app.get('/logout', async function(req,res,next){
    req.session.destroy(function(err){
        console.log('session destroyed')
    })
    res.redirect('/')
});

app.listen(3000)