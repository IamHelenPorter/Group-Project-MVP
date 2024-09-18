// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const hash = await bcrpyt.hash(password, saltRounds);
//       await db(
//         ` insert into user (username, password) VALUES 
//         ('${username}','${password}');`
//       );
//       res.send({message: "Register successful"});
//     } catch (err) {
//         res.status(400).send({ message: err.message });
//     }
//   });