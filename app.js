// config file
const config = require('./config.json');

// express
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// home page
app.get('/', (req, res) => {
	res.render('index');
});

const weatherRouter = require('./routes/weather')
app.use('/weather', weatherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
