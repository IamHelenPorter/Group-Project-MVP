import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function BookWithDoctor() {

   
    const { doctor_id } = useParams();
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [doctor, setDoctor] = useState(null)

        console.log(selectedDate)
        
    const fetchDoctor = () => {
        axios.get(`/api/doctor/${doctor_id}`)
        .then(response => {
          setDoctor(response.data);
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
        <div>
        <DatePicker  value={selectedDate}
         onChange={(newValue) => setSelectedDate(newValue)} />

        </div>


    </div>
  )
}
