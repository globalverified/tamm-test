const express = require('express');
const app = express(); //with app var we connected with express

app.use(express.json());

//middleware implemented here
const middleware = (req, res, next) => {
  console.log(`TAMM middleware`);
  next();
};

app.get('/', (req, res) => {
  res.send(`hello from TAMM server app.js`);
});

//using middleware
app.get('/about', middleware, (req, res) => {
  console.log(`after middleware`);
  res.send(`hello about me`);
});

app.listen(3000, () => {
  console.log(`TAMM server is running at port 3000`);
});
