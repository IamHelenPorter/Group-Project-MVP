import React, { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime, Duration } from 'luxon';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./BookWithDoctor.css"
import { list } from '@chakra-ui/react';


export default function BookWithDoctor() {

    let token = localStorage.getItem("token")
    

    const now = DateTime.now()

    const shouldDisableDate = (date) => {
        return date.isWeekend; 
    };
   
    const { doctor_id } = useParams();
    
    const [selectedDate, setSelectedDate] = useState(now);
    const [doctor, setDoctor] = useState(null);
    const [apptsBookedWithDoctor, setApptsBookedWithDoctor] = useState([]);
    const [listOfAvailableTimes, setListOfAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null)
    const [convertedTime, setConvertedTime] = useState(null)
    const [postableAppt, setPostableAppt] = useState(
        {
        doctor_id: doctor_id,
        start_time: convertedTime,
        status: "booked"
        }
    );
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchDoctor();
    }, []);
    
    useEffect(() => {
         fetchApptsBookedWithDoctor();
    }, [doctor]);
        
    const fetchDoctor = () => {
        axios.get(`http://localhost:4000/api/doctor/${doctor_id}/book`)
        .then(response => {
          setDoctor(response.data);
        })
     };

     const fetchApptsBookedWithDoctor = () => {
        axios.get(`http://localhost:4000/api/appointments/doctor/${doctor_id}`)
        .then(response => {
            setApptsBookedWithDoctor(response.data)
        })
     };

     useEffect(() => {
        // Update postableAppt when convertedTime or doctor_id changes
        setPostableAppt((prevState) => ({
          ...prevState,
          doctor_id: doctor_id, 
          start_time: convertedTime 
        }));
      }, [convertedTime, doctor_id]);

     const handleTimeClick = (e) => {
        setConvertedTime(e.toISO())
        setSelectedTime(e)
     };

     const handleSubmitAppt = () => {
        const confirmSubmit = window.confirm("Are you sure you want to book this appointment?");
        if (confirmSubmit) {
            fetch(`http://localhost:4000/api/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({postableAppt})
                })
                .then((response) => response.json())
                .then((allApptsOfUser) => {
                    console.log(allApptsOfUser);
                    navigate('/profile')
            })
        }
     };


     useEffect(() => {
        //Get times that are already booked for selected day
            const listofUnavailableTimes = [];
            const parsedSelectedDate = DateTime.fromISO(selectedDate);
            for ( let i = 0; i < apptsBookedWithDoctor.length; i++ ) {
    
                let checkBookedAppt = apptsBookedWithDoctor[i].start_time;

                const parsedCheckBookedAppt = DateTime.fromISO(checkBookedAppt);
            
                if (parsedCheckBookedAppt.hasSame(parsedSelectedDate, 'day')) {
                    listofUnavailableTimes.push(parsedCheckBookedAppt)
                }
                console.log(listofUnavailableTimes)
            }  
        //Set working hours, and set duration of appts
            const dateAt9AM = parsedSelectedDate.set({ hour: 9, minute: 0, second: 0 });
            const dateAt5PM = parsedSelectedDate.set({ hour: 17, minute: 0, second: 0});
            const dur = Duration.fromObject({ hours: 0, minutes: 30, seconds: 0});
            let incrementedTime = dateAt9AM;
            let allTimeSlots = [];
       //Find list of all times, push to array
            while (incrementedTime < dateAt5PM) {
                allTimeSlots.push(incrementedTime)
                incrementedTime = incrementedTime.plus(dur)
            }
       // then filter out list of unavailable times
       const availableTimes = allTimeSlots.filter((time) => {
        const timeKey = `${time.hour}:${time.minute}`; // Create a unique key for each time
        
        return !listofUnavailableTimes.some((unavailableTime) => {
          const unavailableKey = `${unavailableTime.hour}:${unavailableTime.minute}`; // Unique key for unavailable times
          return unavailableKey === timeKey; // Returns true if the times match, therefore not adding to the filtered array
            });
         });
        setListOfAvailableTimes(availableTimes);
    }, [apptsBookedWithDoctor, selectedDate]); 






  return (
    <div>
        <h1 className='header'></h1>
            <div className='content'>
            {doctor &&
            <div className='doctor-info'>
            <h1>Dr. {doctor[0].first_name} {doctor[0].last_name} </h1>
            <img src={doctor[0].image} alt="Image of Doctor" 
            className='image'/> 
            <h5>{doctor[0].qualifications}</h5>
            <h3>{doctor[0].speciality}</h3>
            <h2>{doctor[0].name}</h2>
            <h4>{doctor[0].address}</h4>
            </div>
            }
            <div className='calendar-container'>
                <div className='calendar'>
                <DatePicker  value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)} 
                shouldDisableDate={shouldDisableDate}
                />

                </div>
                { listOfAvailableTimes &&
                <div className='buttons'>
                    {listOfAvailableTimes.map((e, index) => (
                    <button
                        type = "button"
                        className=''
                        key = {index}
                        onClick={() => { handleTimeClick(e)}}
                        >
                        {e.hour}:{e.minute === 0 ? '00':e.minute}
                        
                        </button>
                    ))}
                </div>
                }
                {selectedTime && 
                <div className='booking-button'>
                    <button
                    className='submit-button'
                    onClick= {handleSubmitAppt}
                    >
                        Book Appointment with Dr. {doctor[0].last_name} at {selectedTime.hour}:{selectedTime.minute === 0 ? '00' : selectedTime.minute}
                    </button>
                </div>
                }
            </div>
        </div>
    </div>
  )
}
