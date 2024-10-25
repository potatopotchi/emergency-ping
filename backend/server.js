require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const calamitiesRouter = require('./routes/calamities');
const locationsRouter = require('./routes/locations');
const locationGroupsRouter = require('./routes/locationGroups');
const usersRouter = require('./routes/users');
const userStatusRouter = require('./routes/userStatus');
const User = require('./models/userModel');
const LocationGroup = require('./models/locationGroupModel');

const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Register routers
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/calamities', calamitiesRouter);
apiRouter.use('/locations/groups', locationGroupsRouter);
apiRouter.use('/locations', locationsRouter);
apiRouter.use('/users/status', userStatusRouter);
apiRouter.use('/users', usersRouter);
app.use('/api', apiRouter);

const populateInitialData = async function () {
  let results = [];

  // Mock data for Location Groups.
  const municipalities = JSON.parse(fs.readFileSync('data/actual_location_Groups.json', 'utf-8'));
  // await LocationGroup.deleteMany();
  // const municipalities = [
  //   {
  //     region: 'NCR',
  //     province: 'Metro Manila',
  //     municipality: 'Quezon City',
  //     coordinates: [121.0486254, 14.6510546],
  //   },
  //   {
  //     region: 'NCR',
  //     province: 'Metro Manila',
  //     municipality: 'City of Manila',
  //     coordinates: [120.9803621, 14.5904492],
  //   },
  //   {
  //     region: 'NCR',
  //     province: 'Metro Manila',
  //     municipality: 'Taguig City',
  //     coordinates: [121.0744942, 14.5270538],
  //   },
  //   {
  //     region: 'NCR',
  //     province: 'Metro Manila',
  //     municipality: 'Pasig City',
  //     coordinates: [121.0764343, 14.5605166],
  //   },
  //   {
  //     region: 'NCR',
  //     province: 'Metro Manila',
  //     municipality: 'Makati City',
  //     coordinates: [121.0211226, 14.5567949],
  //   },
  //   {
  //     region: 'REG7',
  //     province: 'Cebu',
  //     municipality: 'Cebu City',
  //     coordinates: [123.9019209, 10.2935639],
  //   },
  //   {
  //     region: 'REG3',
  //     province: 'Tarlac',
  //     municipality: 'Tarlac City',
  //     coordinates: [120.5893473, 15.4861218],
  //   },
  // ];

  for (const item of municipalities) {
    const { region, province, municipality, location } = item;
    const code = `PH_${region}_${province.replace(' ', '')}_${municipality.replace(' ', '')}`;
    let coordinates = location.coordinates;

    let exist = await LocationGroup.findOne({code}).lean();
    if (exist) {
      continue;
    }

    results.push(
      LocationGroup.create({
        code,
        country: 'Philippines',
        region,
        province,
        municipality,
        location: {
          'type': 'Point',
          coordinates,
        },
      })
    );
  }

  let locationGroups = await Promise.all(results);
  if (locationGroups.length == 0) {
    locationGroups = await LocationGroup.find();
  }

  // Create superuser.
  results = []

  const usersInfo = [
    {
      email: 'owner@codev.com',
      password: 'Password123!',
      roles: ['SUPERUSER'],
      firstName: 'Owner',
      lastName: 'CoDev',
    },
    {
      email: 'lielt@codev.com',
      password: 'Password123!',
      roles: ['ADMIN'],
      firstName: 'Liel',
      lastName: 'Tan',
    },
    {
      email: 'nicoles@codev.com',
      password: 'Password123!',
      roles: ['ADMIN'],
      firstName: 'Nicole',
      lastName: 'Sumaoang',
    },
    {
      email: 'gengeem@codev.com',
      password: 'Password123!',
      roles: ['USER'],
      firstName: 'Gengee Vor',
      lastName: 'Madarang',
    },
    {
      email: 'dominicl@codev.com',
      password: 'Password123!',
      roles: ['USER'],
      firstName: 'John Dominic',
      lastName: 'Lagarde',
    },
  ];

  for (const userInfo of usersInfo) {
    let exist = await User
      .findOne({email: userInfo.email})
      .lean();

    if (!exist) {
      const userLG = locationGroups[Math.floor(Math.random() * locationGroups.length)];
        
      results.push(
        User.validateThenCreate({
          ...userInfo,
          locationGroup: userLG,
        })
      );
    }
  }

  await Promise.all(results);
}

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Successfully connected to DB.');
    await populateInitialData();
  })
  .catch((error) => {
    console.log(error);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});