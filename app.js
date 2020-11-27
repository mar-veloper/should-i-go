const express = require('express');
const bodyParser = require('body-parser');
const Populartimes = require('@christophern/populartimesjs').Populartimes;
const GooglePlaceProvider = require('google-place-provider');
require('dotenv').config();

const { GOOGLE_API_KEY } = process.env; 
const populartimes = new Populartimes(GOOGLE_API_KEY);

const app = express();
app.use(bodyParser());

// ChIJx2wugWCdX0YRESbzi9wBIr4 - T-Centralen

async function main() {
  try {
    const googlePlace = new GooglePlaceProvider(GOOGLE_API_KEY);

    const textSearch = await googlePlace.textSearch({
        query: 't-centralen',
    });
    console.log(textSearch);
  } catch (e) {
    throw e;
  }
}

app.get('/api/densities', async (req, res) => {
  await main();
  // populartimes.placeDetails('ChIJx2wugWCdX0YRESbzi9wBIr4').then((data) => {
  //   res.json(data);
  // });
  res.end();
});


app.listen(3000, () => console.log(`Listening on 3000...`));