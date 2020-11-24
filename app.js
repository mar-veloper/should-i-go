const express = require('express');
const bodyParser = require('body-parser');
const Populartimes = require('@christophern/populartimesjs').Populartimes;
require('dotenv').config();

const { GOOGLE_API_KEY } = process.env; 
const populartimes = new Populartimes();

const app = express();
app.use(bodyParser());

// ChIJx2wugWCdX0YRESbzi9wBIr4 - T-Centralen

app.get('/api/densities', (req, res) => {
  populartimes.fullWeek('ChIJy-SYzgy1YEYRc6DEL7x_slY').then((data) => {
    res.json(data);
  });
});


app.listen(3000, () => console.log(`Listening on 3000...`));