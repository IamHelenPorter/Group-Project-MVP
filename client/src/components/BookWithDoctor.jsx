import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime, Duration } from 'luxon';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { list } from '@chakra-ui/react';

export default function BookWithDoctor() {

    const now = DateTime.now()
   
    const { doctor_id } = useParams();
    
    const [selectedDate, setSelectedDate] = useState(now);
    const [doctor, setDoctor] = useState(null);
    const [apptsBookedWithDoctor, setApptsBookedWithDoctor] = useState([]);
    const [listOfAvailableTimes, setListOfAvailableTimes] = useState([]);
     


    
        useEffect(() => {
            fetchDoctor();
        }, []);
    
        useEffect(() => {
            fetchApptsBookedWithDoctor();
        }, []);
    
        // useEffect(() => {
        //     getListOfAvailableTimes();
        // }, []);
        
    const fetchDoctor = () => {
        axios.get(`/api/doctor/${doctor_id}`)
        .then(response => {
          setDoctor(response.data);
        })
     };

     const fetchApptsBookedWithDoctor = () => {
        axios.get(`/api/appointments/doctor/${doctor_id}`)
        .then(response => {
            setApptsBookedWithDoctor(response.data)
        })
     };

     useEffect(() => {
        // const getListOfAvailableTimes = (selectedDate) FINISH THIS

        //Get times that are already booked for selected day
        if (apptsBookedWithDoctor.length > 0) {
            const listofUnavailableTimes = [];
            const parsedSelectedDate = DateTime.fromISO(selectedDate);
            for ( let i = 0; i < apptsBookedWithDoctor.length; i++ ) {
    
                let checkBookedAppt = apptsBookedWithDoctor[i].start_time;

                const parsedCheckBookedAppt = DateTime.fromISO(checkBookedAppt);
            
                if (parsedCheckBookedAppt.hasSame(parsedSelectedDate, 'day')) {
                    listofUnavailableTimes.push(parsedCheckBookedAppt)
                }
            }

            const dateAt9AM = parsedSelectedDate.set({ hour: 9, minute: 0, second: 0 });
            const dateAt5PM = parsedSelectedDate.set({ hour: 17, minute: 0, second: 0});
            const dur = Duration.fromObject({ hours: 0, minutes: 30 });
            let incrementedTime = dateAt9AM;
            let allTimeSlots = [];
       //Find list of all times, push to array
            while (incrementedTime < dateAt5PM) {
                allTimeSlots.push(incrementedTime)
                incrementedTime = incrementedTime.plus(dur)
            }
       // then filter out list of unavailable times
            let availableTimes = allTimeSlots.filter((e) => listofUnavailableTimes.indexOf(e) < 0)
            setListOfAvailableTimes(availableTimes);
       
        }
    }, [apptsBookedWithDoctor, selectedDate]); 






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
        {/* <div>
            APPOINTMENT TIME BUTTONS 
            {appointmentTimes.map((time) => (
            <button
                  type="button"
                  className=""
                  aria-label={getAMPMFrm24Hrs(time)}
                  onClick={(event) => { onTimeSelect(event); }}
                >
                  { getAMPMFrm24Hrs(time) }
                </button>
            ))}
        </div>
        <div>
            <h4>
                Appointment with Dr. {doctor[0].last_name}
                {timeString} (30 min)
            </h4>
        </div> */}


    </div>
  )
}
