import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    // Make API call to search endpoint
    axios.get(`/api/search?query=${query}`)
      .then(response => {
        setResults(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error("Error fetching search results:", error);
        setError('Failed to fetch search results');
      });
  };

  const handleResultClick = (result) => {
    if (result.type === 'doctor') {
      navigate(`/doctor/${result.doctor_id}/book`);
    } else if (result.type === 'hospital') {
      navigate(`/hospitals/${result.hospital_id}`);
    } else if (result.type === 'speciality') {
      navigate(`/speciality/${result.speciality}`);
    }
  };

  return (
    <div>
      <h1>Search Doctors, Hospitals, or Specialities</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctors, hospitals, or specialities"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {results.length > 0 ? (
          results.map(result => (
            <li key={result.type === 'doctor' ? result.doctor_id : result.hospital_id || result.speciality}>
              <button onClick={() => handleResultClick(result)}>
                {result.type === 'doctor' && `Dr. ${result.first_name} ${result.last_name} - ${result.speciality} at ${result.hospital_name}`}
                {result.type === 'hospital' && `${result.hospital_name}`}
                {result.type === 'speciality' && `Speciality: ${result.speciality}`}
              </button>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

export default Search;
