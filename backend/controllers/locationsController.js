const axios = require('axios');

const LocationGroup = require('../models/locationGroupModel');


const getNearest = async (req, res) => {
  
  const { q, locationGroup, radius, limit } = req.query;
  let queries = [];

  if (typeof q !== 'string' && isIterable(q)) {
    queries = [...q];
  } else {
    queries = [q];
  }

  if (locationGroup) {
    const locationGroup = await LocationGroup.findOne({ _id: locationGroup })

    if (!locationGroup) {
      return res.status(404).json({error: 'Location group not found'});
    }

    [req.query.lon, req.query.lat] = locationGroup.location.coordinates;
  }

  if (!radius) {
    req.query.radius = 5000;
  }

  if (!limit) {
    req.query.limit = 5;
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
