var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

var jwt = require("jsonwebtoken");
var bcrypt =require("bcrypt");

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});


//POST NEW USER
router.post('/register', async (req, res) => {
  const {first_name, last_name, username, password, email, role, date_of_birth, image} = req.body;

  try {
      const hash = await bcrypt.hash(password, saltRounds);

    await db(`INSERT INTO user (first_name, last_name, username, password, email, role, date_of_birth, image)
       VALUES ('${first_name}', '${last_name}', '${username}', '${hash}', '${email}', '${role}', '${date_of_birth}', '${image}');`);

    const results = await db("SELECT * FROM user;");
    res.send(results.data);

  } catch (err) {
      res.status(400).send({ message: err.message });
  }
})

// POST: User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const results = await db(`SELECT * FROM user WHERE username = '${username}';`);
    
    if (results.data.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const user = results.data[0];

    // the provided password = the hashed password ?
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user)
    if (isMatch) {
      const token = jwt.sign({ userID: user.user_id}, supersecret);

      res.status(200).send({token});
      
    } else {
      res.status(401).send({ message: 'Incorrect password' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

 
 router.get("/private", userShouldBeLoggedIn, async (req, res) => {

  // if I reach next() in userShouldBeLoggedIn, it means my request, which is an object, now has a key called "userID", see line 26 of js file

  try {
    // Fetch user data from the database
    let results = await db(`SELECT * FROM user WHERE user_id = ${req.userID};`);
    
    // Extract the user data from the query result
    let user = results.data[0];
    
    // Format the date_of_birth using JavaScript's native Date object
    if (user.date_of_birth) {
      const dateObj = new Date(user.date_of_birth);

      if (!isNaN(dateObj.getTime())) {
        // Format the date as "04 MAY 1995"
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        user.date_of_birth = dateObj.toLocaleDateString('en-GB', options).toUpperCase();  // Format and convert to uppercase
      } else {
        user.date_of_birth = 'Invalid Date';  // Handle invalid dates
      }
    }

    // Send the formatted user data back to the client
    res.status(200).send(user);

  } catch (err) {
    res.status(500).send(err);
  }
});


//GET ALL DOCTORS INCLUDES ALL DOCTOR INFO, PLUS DOCTOR NAME, IMAGE, HOSPITAL NAME, HOSPITAL ADDRESS
router.get('/doctor', async (req, res) => {
  const sql = `SELECT doctor.*, user.first_name, user.last_name, user.image, hospitals.name, hospitals.address 
  FROM doctor LEFT JOIN user ON user.user_id = doctor.user_id 
  LEFT JOIN hospitals ON hospitals.hospital_id = doctor.hospital_id;`
  try {
    let results = await db(sql);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

//HELEN's ENDPOINT FOR BOOKING CALENDAR
//GET DOCTOR BY ID INCLUDES ALL DOCTOR INFO, PLUS DOCTOR NAME, IMAGE, HOSPITAL NAME, HOSPITAL ADDRESS
router.get(`/doctor/:doctor_id/book`, async (req, res) => {
  const doctor_id = req.params.doctor_id; 
  const sql = `SELECT doctor.*, user.first_name, user.last_name, user.image, hospitals.name, hospitals.address 
  FROM doctor LEFT JOIN user ON user.user_id = doctor.user_id 
  LEFT JOIN hospitals ON hospitals.hospital_id = doctor.hospital_id WHERE doctor.doctor_id = ${doctor_id};`
  try {
    
    const results = await db(sql);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

//GET ALL DOCTORS BY HOSPITAL ID
router.get('/doctor/hospitals/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT doctor.*, user.first_name, user.last_name 
  FROM doctor LEFT JOIN user ON doctor.user_id = user.user_id 
  WHERE doctor.hospital_id = ${id};`
  try {
    const results = await db(sql);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});



//POST NEW DOCTOR
router.post('/doctor', async (req, res) => {
  const { user_id, speciality, hospital_id, qualifications } = req.body;
  const insertDoctor = `INSERT INTO doctor (user_id, speciality, hospital_id, qualifications)
  VALUES (${user_id}, '${speciality}', ${hospital_id}, '${qualifications}');`;
  try {

    const existingDoctor = await db(`SELECT * FROM doctor WHERE user_id = ${user_id};`);
    
    if (existingDoctor.data.length > 0) {
      return res.status(400).send({ error: "Doctor with this user_id already exists." });
    } else {

    await db(insertDoctor);
    const doctorResults = await db(`SELECT doctor.*, user.first_name, user.last_name, user.image, hospitals.name, hospitals.address 
      FROM doctor LEFT JOIN user ON user.user_id = doctor.user_id
       LEFT JOIN hospitals ON hospitals.hospital_id = doctor.hospital_id WHERE user.user_id = ${user_id};`);

    res.send(doctorResults.data)
    }
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

//DELETE DOCTOR BY ID
router.delete('/doctor/:id', async (req, res) => {
  const { id } = req.params;
  const doctorId = Number(id)
  try {
    await db(`DELETE FROM doctor WHERE doctor_id = ${doctorId};`);
    res.send(`Doctor successfully deleted.`);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})

//GET ALL APPOINTMENTS THAT A SPECIFIC USER HAS
router.get('/appointments/user', userShouldBeLoggedIn, async (req, res) => {
  try {
    let results = await db(`SELECT appointments.*, doctor.doctor_id, user.first_name, user.last_name, doctor.speciality, doctor.hospital_id, hospitals.name 
      FROM appointments 
      LEFT JOIN doctor ON appointments.doctor_id = doctor.doctor_id 
      LEFT JOIN user ON doctor.user_id = user.user_id
      LEFT JOIN hospitals ON doctor.hospital_id = hospitals.hospital_id 
      WHERE appointments.user_id = ${req.userID} 
      AND appointments.start_time > NOW() 
      ORDER BY start_time ASC;`);

    // Format each appointment's start_time using JavaScript's native Date object
    const formattedResults = results.data.map(appointment => {
      let formattedTime = '';
      if (appointment.start_time) {
        const dateObj = new Date(appointment.start_time);
        
        if (!isNaN(dateObj.getTime())) {
          // Format the date as "Friday, 18 October 2024, 3am"
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
          formattedTime = dateObj.toLocaleString('en-GB', options);  // Use 'en-GB' locale for correct date formatting
        } else {
          formattedTime = 'Invalid DateTime';  // Handle invalid dates
        }
      }

      // Return the appointment with the formatted start_time
      return {
        ...appointment,
        start_time: formattedTime  // Overwrite the start_time with the formatted version
      };
    });

    res.send(formattedResults);  // Send formatted results
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//GET ALL PAST APPOINTMENTS THAT A SPECIFIC USER HAS
router.get('/pastappointments/user', userShouldBeLoggedIn, async (req, res) => {

  //the variable of the userID at the end of the endpoint is no longer needed because to access this now uses a token
  //the variable at hand is req.userID because we are using the middleware to ensure the user is logged in 
  
  try {
    let results = await db(`SELECT appointments.*, doctor.doctor_id, user.first_name, user.last_name, doctor.speciality, doctor.hospital_id, hospitals.name 
      FROM appointments 
      LEFT JOIN doctor ON appointments.doctor_id = doctor.doctor_id 
      LEFT JOIN user ON doctor.user_id = user.user_id
      LEFT JOIN hospitals ON doctor.hospital_id = hospitals.hospital_id 
      WHERE appointments.user_id = ${req.userID} 
      AND appointments.start_time < NOW() 
    ORDER BY start_time DESC;
      `);

    // Format each appointment's start_time using JavaScript's native Date object
    const formattedResults = results.data.map(appointment => {
      let formattedTime = '';
      if (appointment.start_time) {
        const dateObj = new Date(appointment.start_time);
        
        if (!isNaN(dateObj.getTime())) {
          // Format the date as "Friday, 18 October 2024, 3am"
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
          formattedTime = dateObj.toLocaleString('en-GB', options);  // Use 'en-GB' locale for correct date formatting
        } else {
          formattedTime = 'Invalid DateTime';  // Handle invalid dates
        }
      }

      // Return the appointment with the formatted start_time
      return {
        ...appointment,
        start_time: formattedTime  // Overwrite the start_time with the formatted version
      };
    });

    res.send(formattedResults);  // Send formatted results
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});

// GET ALL APPOINTMENTS BOOKED WITH A SPECIFIC DOCTOR
router.get('/appointments/doctor/:doctorid', async (req, res) => {
  const {doctorid} = req.params;
  try {
    let results = await db(`SELECT appointments.*, user.first_name, user.last_name FROM appointments
       LEFT JOIN user ON appointments.user_id = user.user_id
        WHERE appointments.doctor_id = ${doctorid};`);

    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});


// POST APPOINTMENT
router.post('/appointments', userShouldBeLoggedIn, async (req, res) => {
  const { doctor_id, start_time, status } = req.body.postableAppt
  const user_id = req.userID;
  const insertAppointment = `INSERT INTO appointments (user_id, doctor_id, start_time, status)
   VALUES ( ${user_id}, ${doctor_id}, '${start_time}', '${status}');`
   try {
    await db(insertAppointment);
    const results = await db(`SELECT * FROM appointments WHERE user_id = ${user_id}`);
    res.send(results.data)
  } catch (err) {
    res.status(500).send({error: err.message});
  }
});



//DELETE APPOINTMENT IN USER & DOCTOR PROFILE
router.delete('/appointments/:id', userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.params;
  const appointmentId = Number(id);

  try {
    // Delete the appointment
    await db(`DELETE FROM appointments WHERE appointment_id = ${appointmentId};`);

    // Fetch the upcoming appointments
    let results = await db(`SELECT appointments.*, doctor.doctor_id, user.first_name, user.last_name, doctor.speciality, doctor.hospital_id, hospitals.name 
      FROM appointments 
      LEFT JOIN doctor ON appointments.doctor_id = doctor.doctor_id 
      LEFT JOIN user ON doctor.user_id = user.user_id
      LEFT JOIN hospitals ON doctor.hospital_id = hospitals.hospital_id 
      WHERE appointments.user_id = ${req.userID} 
      AND appointments.start_time > NOW() 
      ORDER BY start_time ASC;`);

    // Format each appointment's start_time using JavaScript's native Date object
    const formattedResults = results.data.map(appointment => {
      let formattedTime = '';
      if (appointment.start_time) {
        const dateObj = new Date(appointment.start_time);

        if (!isNaN(dateObj.getTime())) {
          // Format the date as "Friday, 18 October 2024, 3am"
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
          formattedTime = dateObj.toLocaleString('en-GB', options);  // Use 'en-GB' locale for correct date formatting
        } else {
          formattedTime = 'Invalid DateTime';  // Handle invalid dates
        }
      }

      // Return the appointment with the formatted start_time
      return {
        ...appointment,
        start_time: formattedTime  // Overwrite the start_time with the formatted version
      };
    });

    // Send the formatted results back to the client
    res.send(formattedResults);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



//GET ALL USERS
router.get('/users', async (req, res) => {
  try {
    const results = await db("SELECT * FROM user;");

    res.send(results.data);

  } catch (err) {
    res.send(err);
  }
});



//GET USER BY ID
router.get("/users/:id", async (req, res) => {

  let id = req.params.id;

  try { 

    const results = await db(`SELECT * FROM user WHERE user_id = ${id};`);
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});


//DELETE USER BY ID
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

/* Update user information (PUT) */
router.put("/update", userShouldBeLoggedIn, async (req, res) => {
  try {
    
    // add currentpassword and newpassword later once we update the database
    const { image, email, username, currentpassword, newpassword } =
      req.body;

    if (image) {
      let sql = `
      UPDATE user SET image='${image}' WHERE user_id =${req.userID}`;
      await db(sql);
    }

    if (username) {
      let sql = `
      UPDATE user SET username='${username}' WHERE user_id =${req.userID}`;
      await db(sql);
    }

    if (email) {
      let sql = `
      UPDATE user SET email='${email}' WHERE user_id =${req.userID}`;
      await db(sql);
    }

    if (newpassword) {
      let results = await db(`SELECT * FROM users WHERE user_id = ${req.userID}`);
      if (results.data.length === 0) {
        // if username not found
        res.status(401).send({ error: "Login failed" });
      } else {
        let user = results.data[0]; // the user's row/record from the DB

        let passwordsEqual = await bcrypt.compare(
          currentpassword,
          user.password
        );

        if (passwordsEqual) {
          let hashedPassword = await bcrypt.hash(
            newpassword,
            BCRYPT_WORK_FACTOR
          );

          let sql = `
              UPDATE users SET password ='${hashedPassword}' WHERE user_id = ${req.userID}`;
          await db(sql);
        }
      }
    }

    const results = await db("SELECT * FROM user;");
    res.status(200).send(results.data);
    
  } catch (error) {
    res.send({ message: error });
  }
});


//ENDPOINTS FOR HOSPITAL TABLE
//GET ALL HOSPITALS
router.get('/hospitals', async (req, res) => {
  try {
    const results = await db("SELECT * FROM hospitals;");

    res.send(results.data);

  } catch (err) {
    res.send(err);
  }
});

//POST NEW HOSPITAL
router.post('/hospitals', async (req, res) => {
  let { name, address, emergency, departments } = req.body;

  try {
   
    await db(`INSERT INTO hospitals (name, address, emergency, departments) VALUES ('${name}', '${address}', '${emergency}', '${departments}');`);

    const results = await db("SELECT * FROM hospitals;");
    res.json(results);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ error: err.message });
  }
});


//GET HOSPITAL BY ID
router.get("/hospitals/:id", async (req, res) => {

  let id = req.params.id;

  try { 

    const results = await db(`SELECT * FROM hospitals WHERE hospital_id = ${id};`);
    res.json(results[0]);

  } catch (err) {
    res.send(err)
  }
});

//DELETE HOSPITAL BY ID
router.delete("/hospitals/:id", async (req, res) => {

  let id = req.params.id;

  try { 

    await db(`DELETE FROM hospitals WHERE hospital_id = ${id};`)

    const results = await db("SELECT * FROM hospitals;");
    res.send(results.data);

  } catch (err) {
    res.send(err)
  }
});
 //Specialties
router.get('/speciality', async (req, res) => {
  try {
    const results = await db("SELECT DISTINCT speciality FROM doctor;");
    res.json(results);  // Return the list of unique specialties
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.get('/hospitals/speciality/:speciality', async (req, res) => {
  const { speciality } = req.params;
  
  try {
    const results = await db(`
      SELECT DISTINCT hospitals.hospital_id, hospitals.name, hospitals.address 
      FROM doctor 
      JOIN hospitals ON doctor.hospital_id = hospitals.hospital_id 
      WHERE doctor.speciality = '${speciality}';
    `);
    res.json(results);  // Return the list of hospitals that specialize in the given specialty
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get doctors by hospital ID
router.get('/hospitals/:hospital_id/doctor', async (req, res) => {
  const { hospital_id } = req.params;
  
  try {
    const results = await db(`
      SELECT doctor.*, user.first_name, user.last_name
      FROM doctor
      JOIN user ON doctor.user_id = user.user_id
      WHERE doctor.hospital_id = ${hospital_id};
    `);
    res.json(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.get('/doctor/hospitals/:hospital_id/speciality/:speciality/doctor', async (req, res) => {
  const { hospital_id, speciality } = req.params;
  
  try {
    const results = await db(`
      SELECT doctor.*, user.first_name, user.last_name 
      FROM doctor 
      JOIN user ON doctor.user_id = user.user_id 
      WHERE doctor.hospital_id = ${hospital_id} AND doctor.speciality = '${speciality}';
    `);
    res.json(results);  // Return the list of doctors for the given hospital and specialty
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// Search doctors, hospitals, or specialities
router.get('/search', async (req, res) => {
  const { query } = req.query;  // Get the search query from the request
  
  try {
    const doctorResults = await db(`
      SELECT doctor.doctor_id, doctor.speciality, user.first_name, user.last_name, hospitals.name AS hospital_name, 'doctor' AS type
      FROM doctor
      JOIN user ON doctor.user_id = user.user_id
      JOIN hospitals ON doctor.hospital_id = hospitals.hospital_id
      WHERE user.first_name LIKE '%${query}%' OR user.last_name LIKE '%${query}%' OR doctor.speciality LIKE '%${query}%';
    `);
    
  
    const hospitalResults = await db(`
      SELECT hospital_id, name AS hospital_name, 'hospital' AS type 
      FROM hospitals 
      WHERE name LIKE '%${query}%';
    `);
    
    
    const specialityResults = await db(`
      SELECT DISTINCT doctor.speciality AS speciality, 'speciality' AS type 
      FROM doctor
      WHERE doctor.speciality LIKE '%${query}%';
    `);
   
    const results = [...doctorResults.data, ...hospitalResults.data, ...specialityResults.data];
  

    res.send({ data: results });  // Send the combined results to the frontend
  } catch (err) {
    console.error('Error performing search:', err);
    res.status(500).json({ error: 'Failed to perform search' });
  }
});

router.get('/doctor/:doctor_id', async (req, res) => {
  const { doctor_id } = req.params;
  try {
    const doctor = await db(`SELECT * FROM doctor WHERE doctor_id = ${doctor_id}`);
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hospitals/:hospital_id', async (req, res) => {
  const { hospital_id } = req.params;
  try {
    const results = await db(`SELECT * FROM hospitals WHERE hospital_id = ${hospital_id};`);
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






module.exports = router;


