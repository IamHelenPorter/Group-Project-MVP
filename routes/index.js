var express = require('express');
var router = express.Router();

const db = require("../model/helper");
var bcrpyt =require("bcrypt");
const saltRounds = 10

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});



router.post('/register', async (req, res) => {
  const {first_name, last_name, username, password, email, role, created_at, updated_at, date_of_birth, image} = req.body;

  try {
      const hash = await bcrpyt.hash(password, saltRounds);

    await db(`INSERT INTO user (first_name, last_name, username, password, email, role, created_at, updated_at, date_of_birth, image)
       VALUES ('${first_name}', '${last_name}', '${username}', '${hash}', '${email}', '${role}', '${created_at}', '${updated_at}', '${date_of_birth}', '${image}');`);

    const results = await db("SELECT * FROM user;");
    res.send(results.data);

  } catch (err) {
      res.status(400).send({ message: err.message });
  }
})

router.get('/doctor', async (req, res) => {
  try {
    let results = await db(`SELECT * FROM doctor;`);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})



router.get('/doctor/:id', async (req, res) => {
  const id = req.params.id; 
  const sql = `SELECT doctor.*, user.first_name, user.last_name, user.image, hospital.name, hospital.address 
  FROM doctor LEFT JOIN user ON user.user_id = doctor.user_id 
  LEFT JOIN hospital ON hospital.hospital_id = doctor.hospital_id WHERE user.user_id = ${id};`
  try {
    const results = await db(sql);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

router.post('/doctor', async (req, res) => {
  const { user_id, speciality, hospital_id, qualifications } = req.body;
  const insertDoctor = `INSERT INTO doctor (user_id, speciality, hospital_id, qualifications)
  VALUES (${user_id}, '${speciality}', ${hospital_id}, '${qualifications}');`;
  try {
    await db(insertDoctor);
    const doctorResults = await db(`SELECT * FROM doctor WHERE user_id = ${user_id};`);
    // const userResults = await db(`SELECT * FROM user WHERE user_id = ${user_id};`);
    // const combinedResults = {...doctorResults, userResults.data.first_name, userResults.data.last_name };
    // res.send(combinedResults)
       // NEED TO COMBINE RESULTS TO SEND USER FIRST_NAME AND LAST_NAME AS WELL AS DOCTOR INFO
    res.send(doctorResults)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

// HOW CAN I CHECK THAT DOCTOR_ID EXISTS
router.delete('/doctor/:id', async (req, res) => {
  const { id } = req.params;
  const doctorId = Number(id)
  try {
    await db(`DELETE FROM doctor WHERE doctor_id = ${doctorId};`);
    const results = await db(`SELECT * FROM doctor;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

//DO WE WANT TO GET ALL FROM DOCTOR_ID, OR USER_ID. OR BOTH,
// AND DO WE NEED SEPARATE ROUTES FOR BOTH
router.get('/appointments', async (req, res) => {
  try {
    let results = await db(`SELECT * FROM appointments`);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})


// GETS THIS ERROR MESSAGE: Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
// router.post('/appointments', async (req, res) => {
//   const { user_id, doctor_id, start_time, status } = req.body;
//   const insertAppointment = `INSERT INTO appointments (user_id, doctor_id, start_time, status, created_at, updated_at)
//    VALUES ( ${user_id}, ${doctor_id}, '${start_time}', '${status}');`
// });

// try {
//   await db(insertAppointment);
//   const results = await db(`SELECT * FROM appointments WHERE doctor_id = ${doctor_id}`);
//   res.send(results.data)
// } catch (err) {
//   res.status(500).send({error: err.message});
// }


//DO WE NEED A PUT ROUTE TO UPDATE APPOINTMENTS??



//HOW DO I GET USER ID IN PARAMS, OR CAN I SEND A REQ BODY AS WELL?
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const appointmentId = Number(id)
  try {
    await db(`DELETE FROM appointments WHERE appointment_id = ${appointmentId};`);
    const results = await db(`SELECT * FROM appointments;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

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
