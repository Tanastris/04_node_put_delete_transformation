const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let people = require('./db/people');
const app = express();

const PORT = 3000;
// DATA

let users = [
  {
    id: 1,
    name: 'Serbentautas',
    town: 'Vilnius',
    isDeleted: false,
  },
  {
    id: 2,
    name: 'Lenteja',
    town: 'Kaunas',
    isDeleted: false,
  },
  {
    id: 3,
    name: 'James',
    town: 'London',
    isDeleted: false,
  },
];

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// PEOPLE ROUTES
// GET = /api/people - get all
app.get('/api/people', (req, res) => {
  res.json(people);
});
app.get('/api/people/drivers', (req, res) => {
  const drivers = people.filter((pObj) => pObj.hasCar);
  res.json(drivers);
});
// GET - /apie/people/1 get single
app.get('/api/people/:userId', (req, res) => {
  const userId = +req.params.userId;
  const found = people.find((obj) => obj.id === userId);
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  res.json(found);
});
// DELETE - /apie/people/1 delete single
app.delete('/api/people/:userId', (req, res) => {
  const userId = +req.params.userId;
  people = people.filter((uObj) => uObj.id !== userId);
  res.json(people);
});
// PUT - /apie/people/1 update person
app.put('/api/people/:userId', (req, res) => {
  const userId = +req.params.userId;
  const found = people.find((obj) => obj.id === userId);
  const { sex, name } = req.body;
  found.name = name;
  found.sex = sex;
  res.json(found);
});
// POST - /apie/people add new person
app.post('apie/people');

// GET /api/users - grazina visus vartotojus
app.get('/api/users', (req, res) => {
  const notDeletedUsers = users.filter((uObj) => uObj.isDeleted === false);
  console.log('notDeletedUsers ===', notDeletedUsers);
  res.json(notDeletedUsers);
});

app.get('/api/users/:userId', (req, res) => {
  const userId = +req.params.userId;
  const found = users.find((obj) => obj.id === userId);
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  res.json(found);
});
// DELETE /api/users/1 = deletes user
app.delete('/api/users/:userId', (req, res) => {
  // atfiltruoti users ir grazinti viska isskyrus ta kurio id  === userId
  const userId = +req.params.userId;
  const found = users.find((obj) => obj.id === userId);
  if (found === undefined) {
    res.status(404).json({
      msg: `user not found with id ${userId}`,
    });
    return;
  }
  found.isDeleted = true;
  res.json(users);
});

// PUT /api/users/1 - nusiusti ka atnaujinti - grazinti atnaujinta objekta
app.put('/api/users/:userId', (req, res) => {
  console.log('req.body ===', req.body);
  // surasti useri su od === userId
  // atnaujinti jo savybes
  const userId = +req.params.userId;
  const found = users.find((obj) => obj.id === userId);
  const { town, name } = req.body;
  found.name = name;
  found.town = town;
  res.json(found);
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
