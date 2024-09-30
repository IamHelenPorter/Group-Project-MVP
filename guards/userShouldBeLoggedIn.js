require("dotenv").config();

var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn (req, res, next) {
    let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];
  console.log(token, "token")

  if(!token) {
    res.status(400).send({ message: "please provide a token" });
    return;
  } else {
    //create UserID
    
    //verify token
    jwt.verify(token, supersecret, async function(err,decoded) {
        console.log(decoded)

        if (err) {
            res.status(401).send({ message: err.message });
            return;
          }

        req.userID = decoded.userID

        // allow the request to move to the next step. let it be applicable elsewhere
        next(); 
      })

    
  }

}

module.exports= userShouldBeLoggedIn;