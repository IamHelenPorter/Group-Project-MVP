import React from 'react'
import React, { useState } from 'react';

export default function ListOfDoctors() {

    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const fetchDoctors = () => {
        fetch(`/doctor/search?input=${input}`)
        .then(res => res.json())
        .then(response => {
            setSearchResults(response)
        })

    }

    
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
    };

  return (
    <div>
        <h2>Search By Doctor Name</h2>
        <div className="search-bar-container">
        <div className='input-wrapper'>
            <input placeholder='Type to search...'
            name = "input"
            value={searchInput}
            onChange={(e) => handleChange(e)}
            />
        </div>
        </div>
    </div>
  )
}
