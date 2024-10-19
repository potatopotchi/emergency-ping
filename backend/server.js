require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const calamitiesRouter = require('./routes/calamities');
const locationGroupsRouter = require('./routes/locationGroups');
const usersRouter = require('./routes/users');
const userStatusRouter = require('./routes/userStatus');
const User = require('./models/userModel');
const LocationGroup = require('./models/locationGroupModel');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Register routers
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/calamities', calamitiesRouter);
apiRouter.use('/locations/groups', locationGroupsRouter);
apiRouter.use('/users/status', userStatusRouter);
apiRouter.use('/users', usersRouter);
app.use('/api', apiRouter);

const populateInitialData = async function () {
  // Mock data for Location Groups.
  const municipalities = [
    {
      region: 'NCR',
      province: 'Metro Manila',
      municipality: 'Quezon City',
    },
    {
      region: 'NCR',
      province: 'Metro Manila',
      municipality: 'City of Manila',
    },
    {
      region: 'NCR',
      province: 'Metro Manila',
      municipality: 'Taguig City',
    },
    {
      region: 'NCR',
      province: 'Metro Manila',
      municipality: 'Pasig City',
    },
    {
      region: 'NCR',
      province: 'Metro Manila',
      municipality: 'Makati City',
    },
  ];

  for (const item of municipalities) {
    const { region, province, municipality } = item;
    const code = `PH_${region}_${province.replace(' ', '')}_${municipality.replace(' ', '')}`;

    let exist = await LocationGroup.findOne({code}).lean();
    if (exist) {
      continue;
    }

    await LocationGroup.create({
      code,
      country: 'Philippines',
      region,
      province,
      municipality,
    });
  }

  // Create superuser.
  let exist = await User
    .findOne({email: 'owner@codev.com'})
    .lean();

  if (!exist) {
    const userLG = await LocationGroup
      .findOne({municipality: 'Quezon City'})
      .lean();
      
    await User.validateThenCreate({
      email: 'owner@codev.com',
      password: 'Password123!',
      roles: ['SUPERUSER'],
      firstName: 'Owner',
      lastName: 'CoDev',
      locationGroup: userLG,
    });
  }
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