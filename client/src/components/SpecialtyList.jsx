import { useState, useEffect } from 'react';
import axios from 'axios';

function Specialties() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    axios.get('/api/specialties')
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the specialties!", error);
      });
  }, []);

  return (
    <div>
      <h2>Specialties</h2>
      <ul>
        {specialties.map((specialty, index) => (
          <li key={index}>{specialty.speciality}</li>
        ))}
      </ul>
    </div>
  );
}

export default Specialties;

