var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/doctor', async (req, res) => {
  try {
    let results = await db(`SELECT * FROM doctor;`);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

// router.get('/doctor/:id', async (req, res) => {
//   const id = req.params.id; 
//   try {
//     const results = await db(`SELECT * FROM doctor WHERE doctor_id = ${id}`);
//     // NEED TO COMBINE RESULTS TO SEND USER FIRST_NAME AND LAST_NAME AS WELL AS DOCTOR INFO
//   } catch (err) {
//     res.status(500).send({error: err.message});
//   }
// })

router.post('/doctor', async (req, res) => {
  const { user_id, speciality, hospital_id, qualifications } = req.body;
  const insertDoctor = `INSERT INTO doctor (user_id, speciality, hospital_id, qualifications)
  VALUES ('${user_id}', '${speciality}', '${hospital_id}', '${qualifications}');`;
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

router.get('/appointments', async (req, res) => {
  try {
    let results = await db(`SELECT * FROM appointments`);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

module.exports = router;
