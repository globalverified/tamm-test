import express,{Router} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express(); 

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));//it will make sure space ya kuch extra characters na jaye
app.use(cors());

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

Router.post('/signin', (req, res) => {
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
