const express = require('express');
const app = express(); //with app var we connected with express
const router = express.Router();

app.use(express.json());

//middleware implemented here
const middleware = (req, res, next) => {
  console.log(`TAMM middleware`);
  //our validation for the use of middleware will be done then next() will work
  next();
};

app.get('/', (req, res) => {
  res.send(`hello from TAMM server app.js`);
});

//using middleware
app.get('/about', middleware, (req, res) => {
  console.log(`after middleware`);
  res.send(`hello about TAMM`);
});

router.post('/signin', (req, res) => {
  console.log('signin details: ', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'plz fill the data' });
    }
    if (email == 'admin@itc.com' && password == 'password') {
      res.json({ message: 'TAMM user signin successfully' });
    } else {
      userLogin = false;
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
