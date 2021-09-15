import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
var fs = require('fs');

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //it will make sure space ya kuch extra characters na jaye
app.use(cors());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: 'asdlfjkadsfjitammsecrctekeyfhrgfgrfrty84fwir767',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  })
);

app.use(express.json());

app.use(cookieParser());

//middleware implemented here
const middleware = (req: any, res: any, next: any) => {
  console.log(`TAMM middleware`);
  //our validation for the use of middleware will be done then next() will work
  next();
};
var Session;
const sessionmiddleware = (req: any, res: any, next: any) => {
  console.log(`TAMM sessionmiddleware`);
  // that only allows request to proceed if req has session
  if (req.session && (req.path == '/pub/proxy' || req.path == '/api/proxy')) {
    Session = req.session;
    console.log('session - ', Session);
    res.send('Welcome this request has a session');
    next();
  } else {
    res.send('invalid session');
    res.redirect('/');
  }
};
const checkSession = (req: any, res: any, next: any) => {
  if (req.session) {
    let fileId = req.params.id;
    res.json({ id: fileId });
    next();
  }
};
const checkSaveSession = (req: any, res: any, next: any) => {
  if (req.session && req.body) {
    fs.readFile(__dirname, 'utf8', function(err: any, data: any) {
      if (err) {
        return console.log(err);
      }
      var reqBody = req.body;
      var result = data.replace(reqBody, 'replacement');
      fs.writeFile(__dirname, result, 'utf8', function(err: any) {
        if (err) return console.log(err);
      });
    });
    next();
  }
};

app.get('/', (req: any, res) => {
  res.send(`hello from TAMM server app.js`);
});

//using middleware
app.get('/about', middleware, (req: any, res) => {
  console.log(`after middleware`);
  res.send(`hello about TAMM`);
});

app.use('/pub/proxy', sessionmiddleware, (req: any, res) => {
  console.log(`after sessionmiddleware`);
  res.send(`sessionmiddleware worked`);
});

app.use('/api/proxy ', sessionmiddleware, (req: any, res) => {
  console.log(`after sessionmiddleware`);
  res.send(`sessionmiddleware worked`);
});

app.get('/read/:id', checkSession, (req: any, res) => {
  res.send(`session available for read id`);
});
app.post('/save/:id', checkSaveSession, (req: any, res) => {
  console.log('save id details: ', req.body);
});

app.post('/signin', (req: any, res: any) => {
  console.log('signin details: ', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'plz fill the useremail and password' });
    }
    if (email == 'admin@tamm.com' && password == 'password') {
      res.json({ message: 'TAMM user signin successfully' });
    } else {
      res.status(400).json({ error: 'signin error' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'error in email or password' });
  }
});

app.listen(3000, () => {
  console.log(`TAMM server is running at port 3000`);
});
