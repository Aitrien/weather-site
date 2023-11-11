// config file
//const config = require('./config.json');

// express
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"));

// home page
app.get('/', (req, res) => {
	res.render('index');
});

const weatherRouter = require('./routes/weather')
app.use('/weather', weatherRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`App is now listening`);
});
