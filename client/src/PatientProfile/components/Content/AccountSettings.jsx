//THIS IS ACTUALLY UPCOMING APPOINTMENTS

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel } from '@chakra-ui/react'

function AccountSettings() {

  const [apptData, setApptData] = useState([]);

  // get private user data on page load -> useEffect()!
  useEffect(()=>{
    requestApptData();
  }, []);
  console.log(apptData)

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

      let results = await fetch("http://localhost:4000/api/appointments/user", options);
      let data = await results.json();

    //2. store response private data
      setApptData(data);
  };

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >

      <div className='appts-list'>
        {apptData.map((appt, i) => (
          <div className='appt-card' key={i}>
            <h3>When: {appt.start_time}</h3>
            <p>Status: {appt.status}</p>
            <p>Doctor: {appt.first_name} {appt.last_name}</p>
            <p>Department: {appt.speciality} </p>
            <p>Location: {appt.name}</p>
            <p>EDIT APPT / DELETE APPT</p>
            
          </div>
        ))}
      </div>
      {/* <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Testing
      </FormLabel> */}
      
    </FormControl>
  )
  
}

export default AccountSettings;
