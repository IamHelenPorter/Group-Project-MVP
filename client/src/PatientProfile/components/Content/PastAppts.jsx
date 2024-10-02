// THIS IS ACTUALLY PAST APPOINTMENTS

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl } from '@chakra-ui/react'

function PastAppts() {

  const [pastApptData, setPastApptData] = useState([]);

  // get private user data on page load -> useEffect()!
  useEffect(()=>{
    requestApptData();
  }, []);
  console.log(pastApptData)

  const navigate = useNavigate();

  const requestApptData = async () => {
    //0. if no token then redirect to login, don't let the user see the page
     let token = localStorage.getItem("token")
     if (!token) navigate("/")

    //1. send post request including authorization header
      let options = {
        method: "GET",
        headers: {"authorization": `Bearer ${token}`}
      }

      let results = await fetch("http://localhost:4000/api/pastappointments/user", options);
      let data = await results.json();

    //2. store response private data
      setPastApptData(data);
  };
    
  
    return (
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
  
        <div className='appts-list'>
          {pastApptData.map((appt, i) => (
            <div className='appt-card' key={i}>
              <h3>{appt.start_time}</h3>
              <p>Status: {appt.status}</p>
              <p>Doctor: {appt.first_name} {appt.last_name}</p>
              <p>Department: {appt.speciality} </p>
              <p>Location: {appt.name}</p>
              
            </div>
          ))}
        </div>
   
        
      </FormControl>
    )
  }
  


export default PastAppts;
