const axios = require('axios');

const { getNearestAmenities, isIterable } = require('../core/utils');


const getNearest = async (req, res) => {
  
  const { q } = req.query;
  let queries = [];

  if (typeof q !== 'string' && isIterable(q)) {
    queries = [...q];
  } else {
    queries = [q];
  }

  const responses = await Promise.all(
    queries.map((query) =>
      axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            ...req.query,
            format: 'json',
            q: query,
          }
        },
      )
    )
  );

  let places = [];

  for (const r of responses) {
    places = [...places, ...r.data];
  }

  return res.status(200).json(places);
}


module.exports = {
  getNearest,
}
