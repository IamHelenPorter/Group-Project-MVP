import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function BookWithDoctor() {

   
    const { doctor_id } = useParams();
    

    const [doctor, setDoctor] = useState({})

        
    const fetchDoctor = () => {
        axios.get(`http://localhost:4000/doctor/${doctor_id}`)
        .then(response => {
          setDoctor(response);
          console.log(response.data)
        })
     };


     useEffect(() => {
        fetchDoctor();
    }, []);




  return (
    <div>
        <h1>Book With Doctor</h1>
    </div>
  )
}
