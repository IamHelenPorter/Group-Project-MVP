require("dotenv").config();

var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("THIS IS THE AUTHHEADER", authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ error: "No valid authorization header provided" });
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, supersecret);
    req.userID = decoded.userID; // Assuming the token has user id in it
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token" });
  }
}


// function userShouldBeLoggedIn (req, res, next) {
//     let authHeader = req.headers["authorization"];
//   let token = authHeader.split(" ")[1];
//   console.log(token, "token")

//   if(!token) {
//     res.status(400).send({ message: "please provide a token" });
//     return;
//   } else {
    
//     //verify token
//     jwt.verify(token, supersecret, async function(err,decoded) {
//         console.log(decoded)

//         if (err) {
//             res.status(401).send({ message: err.message });
//             return;
//           }

//         req.userID = decoded.userID

//         // allow the request to move to the next step. let it be applicable elsewhere
//         next(); 
//       })

    
//   }

// }

module.exports= userShouldBeLoggedIn;