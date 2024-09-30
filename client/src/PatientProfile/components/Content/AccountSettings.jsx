//THIS IS ACTUALLY UPCOMING APPOINTMENTS

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel } from '@chakra-ui/react'

function AccountSettings() {

  const [apptData, setApptData] = useState(null);

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
      <FormLabel
        htmlFor="notificationEmails"
        mb={0}
        cursor="pointer"
        userSelect="none"
      >
        Testing
      </FormLabel>
      
    </FormControl>
  )
  
}

export default AccountSettings
