var express = require('express');
var router = express.Router();
const db = require("../model/helper")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

//WORKS
router.get('/users', async (req, res) => {
  try {
    const results = await db("SELECT * FROM user;");

    res.send(results.data);

  } catch (err) {
    res.send(err);
  }
});

//WORKS
router.post('/users', async (req, res) => {
  let {first_name, last_name, username, password, email, role, created_at, updated_at, date_of_birth, image} = req.body;

  try {
    await db(`INSERT INTO user (first_name, last_name, username, password, email, role, created_at, updated_at, date_of_birth, image) VALUES ('${first_name}', '${last_name}', '${username}', '${password}', '${email}', '${role}', '${created_at}', '${updated_at}', '${date_of_birth}', '${image}');`);

    const results = await db("SELECT * FROM user;");
    console.log(`result`)
    res.send(results.data);

  } catch (err) {
    console.log(`error`, err)
    res.send(err)
  }
})

//WORKS
router.get("/users/:id", async (req, res) => {

  let id = req.params.id;

  try { 

    const results = await db(`SELECT * FROM user WHERE user_id = ${id};`);
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});


//WORKS
router.delete("/users/:id", async (req, res) => {

  let id = req.params.id;

  try { // delete by id

    await db(`DELETE FROM user WHERE user_id = ${id};`)

    const results = await db("SELECT * FROM user;");
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});


//ENDPOINTS FOR HOSPITAL TABLE

router.get('/hospitals', async (req, res) => {
  try {
    const results = await db("SELECT * FROM hospital;");

    res.send(results.data);

  } catch (err) {
    res.send(err);
  }
});

router.post('/hospitals', async (req, res) => {
  let {name, address, emergency, departments} = req.body;

  try {
    await db(`INSERT INTO hospital (name, address, emergency, departments) VALUES ('${name}', '${address}', '${emergency}', '${departments}');`);

    const results = await db("SELECT * FROM hospital;");
    console.log(`result`)
    res.send(results.data);

  } catch (err) {
    console.log(`error`, err)
    res.send(err)
  }
});

router.get("/hospitals/:id", async (req, res) => {

  let id = req.params.id;

  try { 

    const results = await db(`SELECT * FROM hospital WHERE hospital_id = ${id};`);
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});

router.delete("/hospitals/:id", async (req, res) => {

  let id = req.params.id;

  try { // delete by id

    await db(`DELETE FROM hospital WHERE hospital_id = ${id};`)

    const results = await db("SELECT * FROM hospital;");
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});




module.exports = router;
