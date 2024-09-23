import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function BookWithDoctor() {

   
    const { doctor_id } = useParams();
    

    const [doctor, setDoctor] = useState(null)

        
    const fetchDoctor = () => {
        axios.get(`http://localhost:4000/doctor/${doctor_id}`)
        .then(response => {
          setDoctor(response.data);
          console.log(response.data)
        })
     };


     useEffect(() => {
        fetchDoctor();
    }, []);




  return (
    <div>
        <h1>Book With Doctor</h1>
        {doctor &&
        <div>
        <img src={doctor[0].image} alt="Image of Doctor" /> 
        <h2>Dr. {doctor[0].first_name} {doctor[0].last_name} </h2>
        <h3>{doctor[0].qualifications}</h3>
        <h3>{doctor[0].speciality}</h3>
        <h3>{doctor[0].name}</h3>
        <h4>{doctor[0].address}</h4>
        </div>
        }


    </div>
  )
}
